package lt.techin.ovidijus.back.service;

import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import lt.techin.ovidijus.back.dto.LoginRequestDTO;
import lt.techin.ovidijus.back.dto.UserResponseDTO;
import lt.techin.ovidijus.back.dto.LoginResponseDTO;
import lt.techin.ovidijus.back.dto.UserRequestDTO;
import org.springframework.security.access.AccessDeniedException;
import lt.techin.ovidijus.back.exceptions.UserAlreadyExistsException;
import lt.techin.ovidijus.back.exceptions.UserNotFoundException;
import lt.techin.ovidijus.back.model.User;
import lt.techin.ovidijus.back.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

@Service
@Slf4j
public class UserService {

    private final UserRepository userRepository;
    private final AuthenticationService authenticationService;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final HttpServletRequest request;
    private final UserDetailsService userDetailsService;


    @Autowired
    public UserService(UserRepository userRepository, AuthenticationService authenticationService, PasswordEncoder passwordEncoder, JwtService jwtService, HttpServletRequest request, @Qualifier("userDetailsService") UserDetailsService userDetailsService) {
        this.userRepository = userRepository;
        this.authenticationService = authenticationService;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.request = request;
        this.userDetailsService = userDetailsService;
    }

    public UserResponseDTO registerUser(UserRequestDTO userRequestDTO) throws UserAlreadyExistsException {
        if (userRepository.existsByEmail(userRequestDTO.getEmail())) {
            throw new UserAlreadyExistsException("Email already exists!");
        }
        if (userRepository.existsByUserName(userRequestDTO.getUserName())) {
            throw new UserAlreadyExistsException("This username already exists!");
        }

        validateUserName(userRequestDTO.getUserName());
        validateEmail(userRequestDTO.getEmail());
        validatePassword(userRequestDTO.getPassword());

        User user = new User();
        user.setUserName(userRequestDTO.getUserName());
        user.setEmail(userRequestDTO.getEmail());
        user.setPassword(authenticationService.encodePassword(userRequestDTO.getPassword()));
        user.setImage("https://avatar.iran.liara.run/public/job/chef/male");
        user.setRole("USER");

        userRepository.save(user);
        return new UserResponseDTO(user.getId(), "User registered successfully!");
    }

    public LoginResponseDTO loginUser(LoginRequestDTO loginRequestDTO) {
        LoginResponseDTO response = new LoginResponseDTO();
        Optional<User> optionalUser = userRepository.findByEmail(loginRequestDTO.getEmail());
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            if (passwordEncoder.matches(loginRequestDTO.getPassword(), user.getPassword())) {
                response.setToken(jwtService.generateToken(user));
                response.setMessage("Login success");
                return response;
            }
        }
        response.setToken(null);
        response.setMessage("Email or password is incorrect");
        return response;
    }

    public UserResponseDTO updateAccount(Long id, UserRequestDTO userRequestDTO)
            throws AccessDeniedException, UserNotFoundException {

        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User not found!"));


        if (!id.equals(existingUser.getId()) && !existingUser.getRole().equals("ADMIN")) {
            throw new AccessDeniedException("You don't have permission to update this user's details");
        }

        boolean tokenShouldBeRegenerated = false;

        if (userRequestDTO.getImage() != null) {
            existingUser.setImage(userRequestDTO.getImage());
            tokenShouldBeRegenerated = true;
        }

        if (userRequestDTO.getUserName() != null) {
            if (!userRequestDTO.getUserName().equals(existingUser.getUsername())
                    && userRepository.existsByUserName(userRequestDTO.getUserName())) {
                return new UserResponseDTO("This username already exists!");
            }
            validateUserName(userRequestDTO.getUserName());
            existingUser.setUserName(userRequestDTO.getUserName());
            tokenShouldBeRegenerated = true;
        }

        if (userRequestDTO.getEmail() != null) {
            if (!userRequestDTO.getEmail().equals(existingUser.getEmail())
                    && userRepository.existsByEmail(userRequestDTO.getEmail())) {
                return new UserResponseDTO("This email already exists!");
            }
            validateEmail(userRequestDTO.getEmail());
            existingUser.setEmail(userRequestDTO.getEmail());
            tokenShouldBeRegenerated = true;
        }

        userRepository.save(existingUser);

        String newToken = null;
        if (tokenShouldBeRegenerated) {
            newToken = jwtService.generateToken(existingUser);
        }

        return new UserResponseDTO(
                existingUser.getId(),
                existingUser.getUsername(),
                existingUser.getEmail(),
                newToken,
                String.format("User with id %d was updated", existingUser.getId()),
                existingUser.getImage()
        );
    }

    public UserResponseDTO deleteAccount(Long id) throws AccessDeniedException {
        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User not found!"));

        if (!existingUser.getRole().equals("ADMIN") && !existingUser.getId().equals(id)) {
            throw new AccessDeniedException("Current user does not have permission to delete this user");
        } else {
            userRepository.deleteById(id);
        }
        clearToken();

        return new UserResponseDTO(existingUser.getId(), String.format("User with id %d, was deleted", existingUser.getId()));
    }

    public UserResponseDTO getOneUser(Long id) {
        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User not found!"));
        return new UserResponseDTO(existingUser.getId(), existingUser.getUsername(), existingUser.getEmail(), "", existingUser.getImage());
    }

    public List<String> getAllUserNames() {
        return userRepository.findAll().stream()
                .map(User::getUsername)
                .collect(Collectors.toList());
    }

    public List<String> getAllUserEmails() {
        return userRepository.findAll().stream()
                .map(User::getEmail)
                .collect(Collectors.toList());
    }

    public Optional<User> getCurrentUser() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (principal instanceof UserDetails) {
            String username = ((UserDetails) principal).getUsername();
            return userRepository.findByUserName(username);
        }
        return Optional.empty();
    }

    public void validateEmail(String email) {
        if (!Pattern.matches("^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$", email)) {
            throw new IllegalArgumentException("Invalid email address format");
        }
    }

    public void validatePassword(String password) {
        if (password == null || password.isEmpty() || password.isBlank()) {
            throw new IllegalArgumentException("Password cannot be empty or blank");
        }
        if (!Pattern.matches(".*[A-Z].*", password)) {
            throw new IllegalArgumentException("Password must include at least one uppercase letter");
        }
        if (!Pattern.matches(".*[a-z].*", password)) {
            throw new IllegalArgumentException("Password must include at least one lowercase letter");
        }
        if (!Pattern.matches(".*\\d.*", password)) {
            throw new IllegalArgumentException("Password must include at least one number");
        }
        if (password.length() < 8) {
            throw new IllegalArgumentException("Password must be at least 8 characters long");
        }
    }

    public void validateUserName(String userName) throws IllegalArgumentException {
        int min = 4;
        int max = 20;

        if (userName == null || userName.isEmpty() || userName.isBlank()) {
            throw new IllegalArgumentException("Username cannot be empty!");
        }
        if (userName.length() < min) {
            throw new IllegalArgumentException("Username must be at least 4 characters");
        }
        if (userName.length() > max) {
            throw new IllegalArgumentException("Username cannot be longer than 20 characters");
        }
        if (userName.startsWith(" ") || userName.endsWith(" ")) {
            throw new IllegalArgumentException("Username cannot start or end with a space");
        }
    }

    public String getCurrentToken() {
        String authorizationHeader = request.getHeader("Authorization");
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            return authorizationHeader.substring(7);
        } else {
            throw new IllegalArgumentException("No JWT token found in the request headers");
        }
    }

    public void clearToken() {
        SecurityContextHolder.clearContext();
    }
}
