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
    private String token;
    private String message;
    private String image;

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

    public UserResponseDTO(Long userId, String userName, String email, String message, String image) {
        this.userId = userId;
        this.userName = userName;
        this.email = email;
        this.message = message;
        this.image = image;
    }

}
