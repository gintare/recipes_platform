package lt.techin.ovidijus.back.controller;

import lombok.AllArgsConstructor;
import lt.techin.ovidijus.back.service.IngredientService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*")
@AllArgsConstructor
public class IngredientController {

    private final IngredientService ingredientService;

    @DeleteMapping("/api/ingredients/{id}")
    public void deleteIngredient(@PathVariable Long id){
        ingredientService.deleteIngredient(id);
    }


}
