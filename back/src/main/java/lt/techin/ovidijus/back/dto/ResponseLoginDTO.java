package lt.techin.ovidijus.back.dto;

import lombok.Data;

@Data
public class ResponseLoginDTO {

    private String token;
    private String message;
}
