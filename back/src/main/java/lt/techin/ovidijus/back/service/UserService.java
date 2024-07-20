package lt.techin.ovidijus.back.service;

import lt.techin.ovidijus.back.dto.LoginDTO;
import lt.techin.ovidijus.back.dto.UserResponseDTO;
import lt.techin.ovidijus.back.dto.ResponseLoginDTO;
import lt.techin.ovidijus.back.dto.UserRequestDTO;
import lt.techin.ovidijus.back.exceptions.UserAlreadyExistsException;
import lt.techin.ovidijus.back.exceptions.UserNotFoundException;
import lt.techin.ovidijus.back.model.User;
import lt.techin.ovidijus.back.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.nio.file.AccessDeniedException;
import java.util.List;
import java.util.Optional;
import java.util.logging.Logger;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final AuthenticationService authenticationService;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    @Autowired
    public UserService(UserRepository userRepository, AuthenticationService authenticationService, PasswordEncoder passwordEncoder, JwtService jwtService) {
        this.userRepository = userRepository;
        this.authenticationService = authenticationService;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public UserResponseDTO registerUser(UserRequestDTO userRequestDTO) throws UserAlreadyExistsException {
        if (userRepository.existsByEmail(userRequestDTO.getEmail())) {
            throw new UserAlreadyExistsException("Email already exists!");
        }
        if (userRepository.existsByUserName(userRequestDTO.getUserName())) {
            throw new UserAlreadyExistsException("This username already exists!");
        }

        User user = new User();
        user.setUserName(userRequestDTO.getUserName());
        validateEmail(userRequestDTO.getEmail());
        user.setEmail(userRequestDTO.getEmail());
        validatePassword(userRequestDTO.getPassword());
        user.setPassword(authenticationService.encodePassword(userRequestDTO.getPassword()));
        user.setImage("https://avatar.iran.liara.run/public/job/chef/male");
        user.setRole("USER");

        userRepository.save(user);
        return new UserResponseDTO(user.getId(), "User registered successfully!");
    }

    public ResponseLoginDTO loginUser(LoginDTO loginDTO) {
        ResponseLoginDTO response = new ResponseLoginDTO();
        Optional<User> optionalUser = userRepository.findByEmail(loginDTO.getEmail());
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            if (passwordEncoder.matches(loginDTO.getPassword(), user.getPassword())) {
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

        User currentUser = getCurrentUser().orElseThrow(() -> new AccessDeniedException("Current user not authenticated"));

        if (!currentUser.getRole().equals("ADMIN") && !currentUser.getId().equals(id)) {
            throw new AccessDeniedException("Current user does not have permission to update this user");
        }

        if (userRequestDTO.getImage() != null) {
            existingUser.setImage(userRequestDTO.getImage());
        }

        if (userRequestDTO.getUserName() != null) {
            if (userRepository.existsByUserName(userRequestDTO.getUserName())
                    && !userRequestDTO.getUserName().equals(existingUser.getUsername())) {
                return new UserResponseDTO("This username already exists!");
            }
            existingUser.setUserName(userRequestDTO.getUserName());
        }

        if (userRequestDTO.getEmail() != null) {
            if (userRepository.existsByEmail(userRequestDTO.getEmail())
                    && !userRequestDTO.getEmail().equals(existingUser.getEmail())) {
                return new UserResponseDTO("This email already exists!");
            }
            validateEmail(userRequestDTO.getEmail());
            existingUser.setEmail(userRequestDTO.getEmail());
        }

        userRepository.save(existingUser);

        return new UserResponseDTO(existingUser.getId(), existingUser.getUsername(), existingUser.getEmail(), String.format("User with id %d was updated", existingUser.getId()));
    }

    public UserResponseDTO deleteAccount(Long id) throws AccessDeniedException {
        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User not found!"));

        User currentUser = getCurrentUser().orElseThrow(() -> new AccessDeniedException("Current user not authenticated"));

        if (!currentUser.getRole().equals("ADMIN") && !currentUser.getId().equals(id)) {
            throw new AccessDeniedException("Current user does not have permission to delete this user");
        } else {
            userRepository.deleteById(id);
        }
        return new UserResponseDTO(existingUser.getId(), String.format("User with id %d, was deleted", existingUser.getId()));
    }

    public UserResponseDTO getOneUser(Long id) {
        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User not found!"));

        return new UserResponseDTO(existingUser.getId(), existingUser.getUsername(), existingUser.getEmail());
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

    public UserResponseDTO validateUserName(String userName) {
        if (userRepository.existsByUserName(userName)) {
            return new UserResponseDTO("This username already exists");
        }
        return new UserResponseDTO("Username is available");
    }
}

