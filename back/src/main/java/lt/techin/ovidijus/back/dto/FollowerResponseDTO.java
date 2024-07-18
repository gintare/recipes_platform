package lt.techin.ovidijus.back.dto;

import lombok.Data;

@Data
public class FollowerResponseDTO {
    private Long id;
    private Long followWhoUserId;
    private Long followWhatUserId;
}
