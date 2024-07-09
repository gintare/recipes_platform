package lt.techin.ovidijus.back.dto;

import lombok.Data;

import java.util.UUID;

@Data
public class UserDTO {

    private UUID id;
    private String userName;
    private String email;
    private String password;
    private String role;
}
