package lt.techin.ovidijus.back.service;

import lombok.AllArgsConstructor;
import lt.techin.ovidijus.back.exceptions.IngredientNotFoundException;
import lt.techin.ovidijus.back.model.Ingredient;
import lt.techin.ovidijus.back.repository.IngredientRepository;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class IngredientService {

    private final IngredientRepository ingredientRepository;

    public void deleteIngredient(Long id) {
        Ingredient ingredient = ingredientRepository.findById(id).orElseThrow(() -> new IngredientNotFoundException("No such ingredient with an id = "+id));
        ingredientRepository.delete(ingredient);
    }
}
