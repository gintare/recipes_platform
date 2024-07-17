package lt.techin.ovidijus.back.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class RegisterResponseDTO {

    private Long userId;
    private String message;
}
