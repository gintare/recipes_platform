package lt.techin.ovidijus.back.controller;

import lt.techin.ovidijus.back.dto.RecipeRequestDTO;
import lt.techin.ovidijus.back.service.RecipeService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RecipeController {

    RecipeService recipeService;

    public RecipeController(RecipeService recipeService) {
        this.recipeService = recipeService;
    }


    @PostMapping("/api/recipe")
    public String createRecipe(@RequestBody RecipeRequestDTO recipeRequestDTO){
        this.recipeService.createRecipe(recipeRequestDTO);
        return recipeRequestDTO.toString();
    }

}
