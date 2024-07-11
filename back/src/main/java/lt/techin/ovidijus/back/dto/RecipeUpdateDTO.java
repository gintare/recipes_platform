package lt.techin.ovidijus.back.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RecipeUpdateDTO {
    private String name;
    private String image;
    private String description;
    private String instructions;
    private Integer timeInMinutes;
    private String category;
}