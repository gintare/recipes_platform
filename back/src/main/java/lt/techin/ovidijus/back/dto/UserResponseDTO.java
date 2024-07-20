package lt.techin.ovidijus.back.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserResponseDTO {

    private Long userId;
    private String userName;
    private String email;
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
}
