package lt.techin.ovidijus.back.dto;

import lombok.Data;
import lt.techin.ovidijus.back.model.Ingredient;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
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
    private Long categoryId;
    private CategoryResponseDTO category;
    private Set<IngredientResponseDTO> ingredients;
    private LocalDateTime createdAt;
}
