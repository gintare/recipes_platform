package lt.techin.ovidijus.back.service;

import lt.techin.ovidijus.back.dto.IngredientRequestDTO;
import lt.techin.ovidijus.back.dto.IngredientResponseDTO;
import lt.techin.ovidijus.back.dto.RecipeRequestDTO;
import lt.techin.ovidijus.back.dto.RecipeResponseDTO;
import lt.techin.ovidijus.back.exceptions.CategoryNotFoundException;
import lt.techin.ovidijus.back.exceptions.RecipeNotFoundException;
import lt.techin.ovidijus.back.exceptions.RequiredFieldIsEmptyException;
import lt.techin.ovidijus.back.model.Category;
import lt.techin.ovidijus.back.model.Ingredient;
import lt.techin.ovidijus.back.model.Recipe;
import lt.techin.ovidijus.back.repository.CategoryRepository;
import lt.techin.ovidijus.back.repository.IngredientRepository;
import lt.techin.ovidijus.back.repository.RecipeRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

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

    public RecipeResponseDTO createRecipe(RecipeRequestDTO recipeRequestDTO) {
        if(recipeRequestDTO.getName().isEmpty()){
            throw new RequiredFieldIsEmptyException("Required name field is empty");
        }
        if(recipeRequestDTO.getDescription().isEmpty()){
            throw new RequiredFieldIsEmptyException("Required description field is empty");
        }
        if(recipeRequestDTO.getInstructions().isEmpty()){
            throw new RequiredFieldIsEmptyException("Required instructions field is empty");
        }
        if(recipeRequestDTO.getTimeInMinutes() == 0){
            throw new RequiredFieldIsEmptyException("Required timeInMinutes field is 0");
        }
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

        Set<IngredientResponseDTO> ingredientResponseDTOSet = new LinkedHashSet<>();
        for (IngredientRequestDTO ingredientDto : recipeRequestDTO.getIngredients()) {
            Ingredient ingredient = new Ingredient();
            ingredient.setTitle(ingredientDto.getTitle());
            ingredient.addRecipe(recipe);
            ingredientRepository.save(ingredient);

            IngredientResponseDTO ingredientResponseDTO = new IngredientResponseDTO();
            ingredientResponseDTO.setId(ingredient.getId());
            ingredientResponseDTO.setTitle(ingredient.getTitle());
            ingredientResponseDTOSet.add(ingredientResponseDTO);

        }

        RecipeResponseDTO recipeResponseDTO = new RecipeResponseDTO();
        recipeResponseDTO.setId(recipe.getId());
        recipeResponseDTO.setName(recipe.getName());
        recipeResponseDTO.setDescription(recipe.getDescription());
        recipeResponseDTO.setImage(recipe.getImage());
        recipeResponseDTO.setInstructions(recipe.getInstructions());
        recipeResponseDTO.setIngredients(ingredientResponseDTOSet);
        return recipeResponseDTO;

    }

    public List<RecipeResponseDTO> findAll() {
        List<Recipe> recipes = this.recipeRepository.findAll();
        List<RecipeResponseDTO> recipeResponseDTOS = new ArrayList<>();
        for(Recipe recipe : recipes){
            RecipeResponseDTO recipeResponseDTO = new RecipeResponseDTO();
            recipeResponseDTO.setId(recipe.getId());
            recipeResponseDTO.setName(recipe.getName());
            recipeResponseDTO.setDescription(recipe.getDescription());
            recipeResponseDTO.setImage(recipe.getImage());
            recipeResponseDTO.setInstructions(recipe.getInstructions());
            recipeResponseDTOS.add(recipeResponseDTO);
        }
        return recipeResponseDTOS;
    }

    public RecipeResponseDTO updateRecipe(Long categoryId, Long recipeId, RecipeRequestDTO recipeRequestDTO) {
        Category category = this.categoryRepository.findById(categoryId).orElseThrow(() -> new CategoryNotFoundException("No category found by id = "+categoryId));
        Recipe recipe = this.recipeRepository.findById(recipeId).orElseThrow(() -> new RecipeNotFoundException("No recipe found with an id = "+recipeId));
        recipe.setName(recipeRequestDTO.getName());
        recipe.setImage(recipeRequestDTO.getImage());
        recipe.setDescription(recipeRequestDTO.getDescription());
        recipe.setInstructions(recipeRequestDTO.getInstructions());
        recipe.setTimeInMinutes(recipeRequestDTO.getTimeInMinutes());
        this.recipeRepository.save(recipe);

        RecipeResponseDTO recipeResponseDTO = new RecipeResponseDTO();
        recipeResponseDTO.setId(recipe.getId());
        recipeResponseDTO.setName(recipe.getName());
        recipeResponseDTO.setDescription(recipe.getDescription());
        recipeResponseDTO.setImage(recipe.getImage());
        recipeResponseDTO.setInstructions(recipe.getInstructions());

        return recipeResponseDTO;
    }
}
