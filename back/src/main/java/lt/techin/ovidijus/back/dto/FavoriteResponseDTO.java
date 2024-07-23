package lt.techin.ovidijus.back.dto;

import lombok.Data;

import java.util.Date;

@Data
public class FavoriteResponseDTO {
    private Long id;
    private Long userId;
    private Long recipeId;
    private Date createdAt;
    private String recipeImage;
    private String recipeName;
    private Integer recipeTimeInMinutes;
    private int recipeAmountOfLikes;
}
