package lt.techin.ovidijus.back.dto;

import lombok.Data;

import java.util.Date;

@Data
public class FavoriteResponseDTO {
    private Long id;
    private Long userId;
    private Long recipeId;
    private Date createdAt;
}
