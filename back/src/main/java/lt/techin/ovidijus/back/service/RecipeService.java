package lt.techin.ovidijus.back.service;

import lt.techin.ovidijus.back.dto.RecipeRequestDTO;
import lt.techin.ovidijus.back.model.Category;
import lt.techin.ovidijus.back.model.Recipe;
import lt.techin.ovidijus.back.repository.CategoryRepository;
import lt.techin.ovidijus.back.repository.IngredientRepository;
import lt.techin.ovidijus.back.repository.RecipeRepository;
import org.springframework.stereotype.Service;

@Service
public class RecipeService {

    RecipeRepository recipeRepository;
    CategoryRepository categoryRepository;
    IngredientRepository ingredientRepository;

    public RecipeService(RecipeRepository recipeRepository, CategoryRepository categoryRepository, IngredientRepository ingredientRepository) {
        this.recipeRepository = recipeRepository;
        this.categoryRepository = categoryRepository;
        this.ingredientRepository = ingredientRepository;
    }

    public void createRecipe(RecipeRequestDTO recipeRequestDTO) {
        Category category = categoryRepository.findByName(recipeRequestDTO.getCategory().getName());
        if(category == null){
            category = new Category();
            category.setName(recipeRequestDTO.getCategory().getName());
            categoryRepository.save(category);
        }

        

        Recipe recipe = new Recipe();
        recipe.setName(recipeRequestDTO.getName());
        recipe.setImage(recipeRequestDTO.getImage());
        recipe.setDescription(recipeRequestDTO.getDescription());
        recipe.setInstructions(recipeRequestDTO.getInstructions());
        recipe.setTimeInMinutes(recipeRequestDTO.getTimeInMinutes());
        recipe.setCategory(category);

        this.recipeRepository.save(recipe);
    }
}
