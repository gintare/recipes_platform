package lt.techin.ovidijus.back.dto;

import lombok.Data;
import lt.techin.ovidijus.back.model.Ingredient;

import java.util.Set;

@Data
public class RecipeResponseDTO {
    private Long id;
    private Long userId;
    private String name;
    private String image;
    private String description;
    private String instructions;
    private int timeInMinutes;
    private Set<IngredientResponseDTO> ingredients;
}
