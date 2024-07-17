package lt.techin.ovidijus.back.service;

import lt.techin.ovidijus.back.dto.LoginDTO;
import lt.techin.ovidijus.back.dto.RegisterResponseDTO;
import lt.techin.ovidijus.back.dto.ResponseLoginDTO;
import lt.techin.ovidijus.back.dto.UserDTO;
import lt.techin.ovidijus.back.exceptions.UserAlreadyExistsException;
import lt.techin.ovidijus.back.model.User;
import lt.techin.ovidijus.back.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
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

    public RegisterResponseDTO registerUser(UserDTO userDTO) throws UserAlreadyExistsException {
        if (userRepository.existsByEmail(userDTO.getEmail())) {
            throw new UserAlreadyExistsException("Email already exists!");
        }
        if (userRepository.existsByUserName(userDTO.getUserName())) {
            throw new UserAlreadyExistsException("This username already exists!");
        }

        User user = new User();
        user.setUserName(userDTO.getUserName());
        validateEmail(userDTO.getEmail());
        user.setEmail(userDTO.getEmail());
        validatePassword(userDTO.getPassword());
        user.setPassword(authenticationService.encodePassword(userDTO.getPassword()));
        user.setRole("USER");

        userRepository.save(user);
        return new RegisterResponseDTO(user.getId(), "User registered successfully!");
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

//    public void validateEmail(String email) {
//        String emailPattern = "^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$";
//        Pattern pattern = Pattern.compile(emailPattern, Pattern.CASE_INSENSITIVE);
//        if (!pattern.matcher(email).matches()) {
//            throw new IllegalArgumentException("Invalid email address format");
//        }
//    }

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
}
