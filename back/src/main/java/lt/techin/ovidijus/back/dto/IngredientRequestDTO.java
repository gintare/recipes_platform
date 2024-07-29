package lt.techin.ovidijus.back.dto;

import lombok.Data;

@Data
public class IngredientRequestDTO {
    private Long ingredientId;
    private String title;
    private String orderNumber;
}
