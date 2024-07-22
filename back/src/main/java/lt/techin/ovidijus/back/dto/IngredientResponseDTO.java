package lt.techin.ovidijus.back.dto;

import lombok.Data;

@Data
public class IngredientResponseDTO {
    private Long ingredientId;
    private String title;
    private Integer orderNumber;
}
