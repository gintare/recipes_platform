package lt.techin.ovidijus.back.dto;

import lombok.Data;

import java.util.Date;

@Data
public class CommentResponseDTO {
    private Long id;
    private String text;
    private Long userId;
    private Long recipeId;
    private Date createdAt;

}
