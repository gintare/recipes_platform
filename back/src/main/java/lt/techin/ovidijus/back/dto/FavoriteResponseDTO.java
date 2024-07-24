package lt.techin.ovidijus.back.dto;

import lombok.Data;

import java.util.Date;

@Data
public class FavoriteResponseDTO {
    private Long id;
    private Long userId;
    private Long recipeId;
    private Date createdAt;
<<<<<<< HEAD
    private String recipeImage;
    private String recipeName;
    private Integer recipeTimeInMinutes;
    private int recipeAmountOfLikes;
=======
>>>>>>> 88a9aa0e33743b0cea617421457c98939bfd8804
}
