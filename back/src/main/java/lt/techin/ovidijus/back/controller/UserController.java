package lt.techin.ovidijus.back.controller;

import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import lt.techin.ovidijus.back.dto.LoginRequestDTO;
import lt.techin.ovidijus.back.dto.UserResponseDTO;
import lt.techin.ovidijus.back.dto.LoginResponseDTO;
import lt.techin.ovidijus.back.dto.UserRequestDTO;
import lt.techin.ovidijus.back.exceptions.UserAlreadyExistsException;
import lt.techin.ovidijus.back.exceptions.UserNotFoundException;
import lt.techin.ovidijus.back.repository.UserRepository;
import lt.techin.ovidijus.back.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping
@Slf4j
public class UserController {

    private final UserRepository userRepository;
    private UserService userService;

    @Autowired
    public UserController(UserService userService, UserRepository userRepository) {
        this.userService = userService;
        this.userRepository = userRepository;
    }

    @PostMapping("/register")
    public ResponseEntity<UserResponseDTO> registerUser(@RequestBody UserRequestDTO userRequestDTO) {
        try {
            UserResponseDTO response = userService.registerUser(userRequestDTO);
            return ResponseEntity.ok(response);
        } catch (UserAlreadyExistsException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(new UserResponseDTO(e.getMessage()));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new UserResponseDTO(e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@RequestBody LoginRequestDTO loginRequestDTO) {
        LoginResponseDTO loggedUser = userService.loginUser(loginRequestDTO);
        if (loggedUser.getToken() == null) {
            return ResponseEntity.badRequest().body(loggedUser);
        }
        return ResponseEntity.ok(loggedUser);
    }

    @PatchMapping("/users/{id}")
    public ResponseEntity<UserResponseDTO> updateAccount(@PathVariable Long id, @RequestBody UserRequestDTO userRequestDTO) {
        try {
            UserResponseDTO updatedAccount = userService.updateAccount(id, userRequestDTO);
            return new ResponseEntity<>(updatedAccount, HttpStatus.OK);
        } catch (UserNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        } catch (AccessDeniedException e) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<UserResponseDTO> deleteAccount(@PathVariable long id) {
        try {
            UserResponseDTO response = userService.deleteAccount(id);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (UserNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/users/emails")
    public ResponseEntity<List<String>> getAllUserEmails() {
        List<String> emails = userService.getAllUserEmails();
        return ResponseEntity.ok(emails);
    }

    @GetMapping("/users/usernames")
    public ResponseEntity<List<String>> getAllUserNames() {
        List<String> usernames = userService.getAllUserNames();
        return ResponseEntity.ok(usernames);
    }

    @GetMapping("/users/{id}")
    public UserResponseDTO getOneUser(@PathVariable long id) {
        return userService.getOneUser(id);
    }

}