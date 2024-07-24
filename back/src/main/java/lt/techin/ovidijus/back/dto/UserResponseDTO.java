package lt.techin.ovidijus.back.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UserResponseDTO {

    private Long userId;
    private String userName;
    private String email;
<<<<<<< HEAD
    private String token;
=======
>>>>>>> 88a9aa0e33743b0cea617421457c98939bfd8804
    private String message;

    public UserResponseDTO(String message) {
        this.message = message;
    }

    public UserResponseDTO(Long userId, String message) {
        this.userId = userId;
        this.message = message;
    }

    public UserResponseDTO(Long userId, String userName, String email) {
        this.userId = userId;
        this.userName = userName;
        this.email = email;
    }
<<<<<<< HEAD

    public UserResponseDTO(Long userId, String userName, String email, String message) {
        this.userId = userId;
        this.userName = userName;
        this.email = email;
        this.message = message;
    }
=======
>>>>>>> 88a9aa0e33743b0cea617421457c98939bfd8804
}
