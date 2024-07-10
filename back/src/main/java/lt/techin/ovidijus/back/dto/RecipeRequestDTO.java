package lt.techin.ovidijus.back.dto;

import jakarta.persistence.*;
import lombok.Data;
import lt.techin.ovidijus.back.model.Category;
import lt.techin.ovidijus.back.model.Ingredient;

import java.util.LinkedHashSet;
import java.util.Set;

@Data
public class RecipeRequestDTO {
    private String name;

    private String image;

    private String description;

    private String instructions;

    private int timeInMinutes;

    private CategoryRequestDTO category;

    private Set<IngredientRequestDTO> ingredients ;
}
