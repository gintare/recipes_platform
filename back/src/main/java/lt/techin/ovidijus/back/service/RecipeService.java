package lt.techin.ovidijus.back.service;

import lt.techin.ovidijus.back.dto.*;
import lt.techin.ovidijus.back.exceptions.*;
import lt.techin.ovidijus.back.model.Category;
import lt.techin.ovidijus.back.model.Ingredient;
import lt.techin.ovidijus.back.model.Recipe;
import lt.techin.ovidijus.back.model.User;
import lt.techin.ovidijus.back.repository.CategoryRepository;
import lt.techin.ovidijus.back.repository.IngredientRepository;
import lt.techin.ovidijus.back.repository.RecipeRepository;
import lt.techin.ovidijus.back.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;

@Service
public class RecipeService {

    private static final int TIME_IN_MINUTES_MAX_CHARS = 5;
    private static final int RECORDS_PER_PAGE = 12;
    RecipeRepository recipeRepository;
    CategoryRepository categoryRepository;
    IngredientRepository ingredientRepository;
    UserRepository userRepository;

    @Autowired
    public RecipeService(RecipeRepository recipeRepository, CategoryRepository categoryRepository, IngredientRepository ingredientRepository, UserRepository userRepository) {
        this.recipeRepository = recipeRepository;
        this.categoryRepository = categoryRepository;
        this.ingredientRepository = ingredientRepository;
        this.userRepository = userRepository;
    }

    public RecipeResponseDTO createRecipe(Long categoryId, Long userId, RecipeRequestDTO recipeRequestDTO) {
        validateCharCount(recipeRequestDTO.getTimeInMinutes());
        if (recipeRequestDTO.getName().trim().isEmpty()) {
            throw new RequiredFieldIsEmptyException("Required name field is empty");
        }
        if (recipeRequestDTO.getDescription().trim().isEmpty()) {
            throw new RequiredFieldIsEmptyException("Required description field is empty");
        }
        if (recipeRequestDTO.getInstructions().trim().isEmpty()) {
            throw new RequiredFieldIsEmptyException("Required instructions field is empty");
        }
        if (recipeRequestDTO.getTimeInMinutes() == 0) {
            throw new RequiredFieldIsEmptyException("Required timeInMinutes field is 0");
        }
        if (recipeRequestDTO.getIngredients() == null) {
            throw new IngredientNotFoundException("No input ingredients found");
        }
        if (recipeRequestDTO.getIngredients().isEmpty()) {
            throw new IngredientNotFoundException("No input ingredients found");
        }
        Category category = categoryRepository.findById(categoryId).orElseThrow(() -> new CategoryNotFoundException("No category found with an id = " + categoryId));
        User user = userRepository.findById(userId).orElseThrow(() -> new UserNotFoundException("No user found by user id =" + userId));
        if (recipeRequestDTO.getIngredients().isEmpty()) {
            throw new IngredientNotFoundException("No ingredients found");
        }

        Recipe recipe = new Recipe();
        recipe.setName(recipeRequestDTO.getName());
        recipe.setImage(recipeRequestDTO.getImage());
        recipe.setDescription(recipeRequestDTO.getDescription());
        recipe.setInstructions(recipeRequestDTO.getInstructions());
        recipe.setTimeInMinutes(recipeRequestDTO.getTimeInMinutes());
        recipe.setCategory(category);
        recipe.setUser(user);
        this.recipeRepository.save(recipe);

        Set<IngredientResponseDTO> ingredientResponseDTOSet = new LinkedHashSet<>();
        for (IngredientRequestDTO ingredientDto : recipeRequestDTO.getIngredients()) {
            if (!ingredientDto.getTitle().trim().isEmpty()) {
                Ingredient ingredient = new Ingredient();
                ingredient.setTitle(ingredientDto.getTitle());
                ingredient.addRecipe(recipe);
                ingredient.setOrderNumber(Integer.parseInt(ingredientDto.getOrderNumber()));
                ingredientRepository.save(ingredient);

                IngredientResponseDTO ingredientResponseDTO = new IngredientResponseDTO();
                ingredientResponseDTO.setIngredientId(ingredient.getId());
                ingredientResponseDTO.setTitle(ingredient.getTitle());
                ingredientResponseDTO.setOrderNumber(ingredient.getOrderNumber());
                ingredientResponseDTOSet.add(ingredientResponseDTO);
            }

        }

        RecipeResponseDTO recipeResponseDTO = new RecipeResponseDTO();
        recipeResponseDTO.setId(recipe.getId());
        recipeResponseDTO.setName(recipe.getName());
        recipeResponseDTO.setDescription(recipe.getDescription());
        recipeResponseDTO.setImage(recipe.getImage());
        recipeResponseDTO.setInstructions(recipe.getInstructions());
        recipeResponseDTO.setTimeInMinutes(recipe.getTimeInMinutes());
        recipeResponseDTO.setCategoryId(recipe.getCategory().getId());
        recipeResponseDTO.setUserId(recipe.getUser().getId());
        recipeResponseDTO.setIngredients(ingredientResponseDTOSet);
        return recipeResponseDTO;

    }

    public List<RecipeResponseDTO> findAll() {
        List<Recipe> recipes = this.recipeRepository.findAll();
        List<RecipeResponseDTO> recipeResponseDTOS = new ArrayList<>();
        for (Recipe recipe : recipes) {
            RecipeResponseDTO recipeResponseDTO = new RecipeResponseDTO();
            recipeResponseDTO.setId(recipe.getId());
            // recipeResponseDTO.setUserId(recipe.getUser().getId());
            recipeResponseDTO.setName(recipe.getName());
            recipeResponseDTO.setDescription(recipe.getDescription());
            recipeResponseDTO.setImage(recipe.getImage());
            recipeResponseDTO.setInstructions(recipe.getInstructions());
            recipeResponseDTO.setTimeInMinutes(recipe.getTimeInMinutes());
            recipeResponseDTOS.add(recipeResponseDTO);
        }
        return recipeResponseDTOS;
    }

    public RecipeResponseDTO updateRecipe(Long categoryId, Long recipeId, RecipeRequestDTO recipeRequestDTO) {
        validateCharCount(recipeRequestDTO.getTimeInMinutes());
        Category category = this.categoryRepository.findById(categoryId).orElseThrow(() -> new CategoryNotFoundException("No category found by id = " + categoryId));
        Recipe recipe = this.recipeRepository.findById(recipeId).orElseThrow(() -> new RecipeNotFoundException("No recipe found with an id = " + recipeId));
        recipe.setName(recipeRequestDTO.getName());
        recipe.setImage(recipeRequestDTO.getImage());
        recipe.setDescription(recipeRequestDTO.getDescription());
        recipe.setInstructions(recipeRequestDTO.getInstructions());
        recipe.setTimeInMinutes(recipeRequestDTO.getTimeInMinutes());
        recipe.setCategory(category);
        this.recipeRepository.save(recipe);

        Set<IngredientResponseDTO> ingredientResponseDTOSet = new LinkedHashSet<>();
        Set<IngredientRequestDTO> ingredientRequestDTOS = recipeRequestDTO.getIngredients();

        for(IngredientRequestDTO ingredientRequestDTO : ingredientRequestDTOS) {
            if(ingredientRequestDTO.getTitle().trim().isEmpty()) {
                if(ingredientRequestDTO.getIngredientId() != null){
                    Ingredient ingredient = this.ingredientRepository.findById(ingredientRequestDTO.getIngredientId())
                            .orElseThrow(() -> new IngredientNotFoundException("No ingredient found with an id = " + ingredientRequestDTO.getIngredientId()));
                    this.ingredientRepository.delete(ingredient);
                }
            } else {
                Ingredient ingredient = null;
                if (ingredientRequestDTO.getIngredientId() != null) {
                    ingredient = this.ingredientRepository.findById(ingredientRequestDTO.getIngredientId())
                            .orElseThrow(() -> new IngredientNotFoundException("No ingredient found with an id = " + ingredientRequestDTO.getIngredientId()));
                } else {
                    ingredient = new Ingredient();
                }
                ingredient.setTitle(ingredientRequestDTO.getTitle());
                ingredient.setOrderNumber(Integer.valueOf(ingredientRequestDTO.getOrderNumber()));
                ingredient.setRecipe(recipe);
                this.ingredientRepository.save(ingredient);

                IngredientResponseDTO ingredientResponseDTO = new IngredientResponseDTO();
                ingredientResponseDTO.setIngredientId(ingredient.getId());
                ingredientResponseDTO.setTitle(ingredient.getTitle());
                ingredientResponseDTO.setOrderNumber(ingredient.getOrderNumber());
                ingredientResponseDTOSet.add(ingredientResponseDTO);
            }
        }

        RecipeResponseDTO recipeResponseDTO = new RecipeResponseDTO();
        recipeResponseDTO.setId(recipe.getId());
        recipeResponseDTO.setName(recipe.getName());
        recipeResponseDTO.setDescription(recipe.getDescription());
        recipeResponseDTO.setImage(recipe.getImage());
        recipeResponseDTO.setInstructions(recipe.getInstructions());
        recipeResponseDTO.setTimeInMinutes(recipe.getTimeInMinutes());
        recipeResponseDTO.setCategoryId(recipe.getCategory().getId());
        recipeResponseDTO.setUserId(recipe.getUser().getId());
        recipeResponseDTO.setIngredients(ingredientResponseDTOSet);

        return recipeResponseDTO;
    }

    private void validateCharCount(int timeInMinutes) {
        if (String.valueOf(timeInMinutes).length() > TIME_IN_MINUTES_MAX_CHARS) {
            throw new SymbolLimitException("Symbols limit out of range for timeInMinutes " + timeInMinutes + ", should be " + TIME_IN_MINUTES_MAX_CHARS + " or less.");
        }
    }

    public void deleteRecipe(Long recipeId) {
        Recipe recipe = recipeRepository.findById(recipeId).orElseThrow(() -> new RecipeNotFoundException("Recipe not found with an id = " + recipeId));
        recipeRepository.deleteById(recipeId);
    }

    public void updateRecipe(Long recipeId, RecipeUpdateDTO recipeUpdateDTO) {
        Recipe recipe = recipeRepository.findById(recipeId).orElseThrow();

        Category category = categoryRepository.findByName(recipeUpdateDTO.getCategory());
        if (category == null) {
            category = new Category();
            category.setName(recipeUpdateDTO.getCategory());
            categoryRepository.save(category);
        }

        recipe.setName(recipeUpdateDTO.getName());
        recipe.setImage(recipeUpdateDTO.getImage());
        recipe.setDescription(recipeUpdateDTO.getDescription());
        recipe.setInstructions(recipeUpdateDTO.getInstructions());
        recipe.setTimeInMinutes(recipeUpdateDTO.getTimeInMinutes());
        recipe.setCategory(category);

        recipeRepository.save(recipe);
    }

    public List<RecipeResponseDTO> findByUserId(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new UserNotFoundException("No user found by user id =" + userId));
        List<Recipe> recipes = this.recipeRepository.findByUser(user);

        List<RecipeResponseDTO> recipeResponseDTOS = new ArrayList<>();
        for (Recipe recipe : recipes) {
            RecipeResponseDTO recipeResponseDTO = getRecipeResponseDTO(recipe);
            recipeResponseDTO.setCategoryId(recipe.getCategory().getId());
            Set<IngredientResponseDTO> ingredientResponseDTOS = new LinkedHashSet<>();
            List<Ingredient> ingredientsSorted = recipe.getIngredients().stream().toList();
            boolean isNull = false;
            for (Ingredient ingredient : ingredientsSorted) {
                if (ingredient.getOrderNumber() == null) {
                    isNull = true;
                }
            }

            if (!isNull) {
                ingredientsSorted = recipe.getIngredients().stream().sorted((i1, i2) -> i1.getOrderNumber().compareTo(i2.getOrderNumber())).toList();
            }
            for (Ingredient ingredient : ingredientsSorted) {
                IngredientResponseDTO ingredientResponseDTO = new IngredientResponseDTO();
                ingredientResponseDTO.setIngredientId(ingredient.getId());
                ingredientResponseDTO.setTitle(ingredient.getTitle());
                ingredientResponseDTO.setOrderNumber(ingredient.getOrderNumber());
                ingredientResponseDTOS.add(ingredientResponseDTO);
            }
            recipeResponseDTO.setIngredients(ingredientResponseDTOS);
            recipeResponseDTOS.add(recipeResponseDTO);
        }
        return recipeResponseDTOS;
    }

    public RecipeResponseDTO findOneRecipe(Long recipeId) {
        Recipe recipe = this.recipeRepository.findById(recipeId).orElseThrow(() -> new RecipeNotFoundException("No recipe found with an id = " + recipeId));

        RecipeResponseDTO recipeResponseDTO = getRecipeResponseDTO(recipe);
        recipeResponseDTO.setCategoryId(recipe.getCategory().getId());

        List<Ingredient> ingredientsSorted = recipe.getIngredients().stream().toList();
        boolean isNull = false;
        for (Ingredient ingredient : ingredientsSorted) {
            if (ingredient.getOrderNumber() == null) {
                isNull = true;
            }
        }

        if(!isNull){
            ingredientsSorted = recipe.getIngredients().stream().sorted(Comparator.comparing(Ingredient::getOrderNumber)).toList();
        }
        Set<IngredientResponseDTO> ingredientResponseDTOS = new LinkedHashSet<>();
        for (Ingredient ingredient : ingredientsSorted) {
            IngredientResponseDTO ingredientResponseDTO = new IngredientResponseDTO();
            ingredientResponseDTO.setIngredientId(ingredient.getId());
            ingredientResponseDTO.setTitle(ingredient.getTitle());
            ingredientResponseDTO.setOrderNumber(ingredient.getOrderNumber());
            ingredientResponseDTOS.add(ingredientResponseDTO);
        }
        recipeResponseDTO.setIngredients(ingredientResponseDTOS);

        return recipeResponseDTO;
    }

//    public List<RecipeResponseDTO> findAllByPageNumber(Integer pageNumber) {
////        Pageable firstPageWithTwoElements = PageRequest.of(0, 2);
//        Pageable page = PageRequest.of(pageNumber, RECORDS_PER_PAGE);
//        Page<Recipe> recipePage = this.recipeRepository.findAll(page);
//        List<RecipeResponseDTO> recipeResponseDTOS = new ArrayList<>();
//        for (Recipe recipe : recipePage.getContent()) {
//            RecipeResponseDTO recipeResponseDTO = getRecipeResponseDTO(recipe);
//            recipeResponseDTOS.add(recipeResponseDTO);
//        }
//        return recipeResponseDTOS;
//    }

    public List<RecipeResponseDTO> findAllByPageNumber(Integer pageNumber) {
        Pageable page = PageRequest.of(pageNumber, RECORDS_PER_PAGE);
        List<Recipe> recipes = this.recipeRepository.findAllByOrderByCreatedAtDesc(page);
        List<RecipeResponseDTO> recipeResponseDTOS = new ArrayList<>();
        for (Recipe recipe : recipes) {
            RecipeResponseDTO recipeResponseDTO = getRecipeResponseDTO(recipe);
            recipeResponseDTOS.add(recipeResponseDTO);
        }
        return recipeResponseDTOS;
    }

    private static RecipeResponseDTO getRecipeResponseDTO(Recipe recipe) {
        RecipeResponseDTO recipeResponseDTO = new RecipeResponseDTO();
        recipeResponseDTO.setId(recipe.getId());
        recipeResponseDTO.setUserId(recipe.getUser().getId());
        recipeResponseDTO.setName(recipe.getName());
        recipeResponseDTO.setDescription(recipe.getDescription());
        recipeResponseDTO.setImage(recipe.getImage());
        recipeResponseDTO.setInstructions(recipe.getInstructions());
        recipeResponseDTO.setTimeInMinutes(recipe.getTimeInMinutes());
        recipeResponseDTO.setCategoryId(recipe.getCategory().getId());
        CategoryResponseDTO categoryResponseDTO = new CategoryResponseDTO();
        categoryResponseDTO.setId(recipe.getCategory().getId());
        categoryResponseDTO.setName(recipe.getCategory().getName());
        recipeResponseDTO.setCategory(categoryResponseDTO);
        Set<IngredientResponseDTO> ingredientResponseDTOS = new LinkedHashSet<>();
        for (Ingredient ingredient : recipe.getIngredients()) {
            IngredientResponseDTO ingredientResponseDTO = new IngredientResponseDTO();
            ingredientResponseDTO.setIngredientId(ingredient.getId());
            ingredientResponseDTO.setTitle(ingredient.getTitle());
            ingredientResponseDTO.setOrderNumber(ingredient.getOrderNumber());
            ingredientResponseDTOS.add(ingredientResponseDTO);
        }
        recipeResponseDTO.setIngredients(ingredientResponseDTOS);
        return recipeResponseDTO;
    }

    public List<RecipeResponseDTO> findAllByCategoryAndPageNumber(Long categoryId, Integer pageNumber) {
        Category category = this.categoryRepository.findById(categoryId).orElseThrow(() -> new CategoryNotFoundException("No category found by id = " + categoryId));
        Pageable page = PageRequest.of(pageNumber, RECORDS_PER_PAGE);
        List<Recipe> recipes = this.recipeRepository.findByCategory(category, page);
        List<RecipeResponseDTO> recipeResponseDTOS = new ArrayList<>();
        for (Recipe recipe : recipes) {
            RecipeResponseDTO recipeResponseDTO = getRecipeResponseDTO(recipe);
            recipeResponseDTOS.add(recipeResponseDTO);
        }
        return recipeResponseDTOS;
    }

    public List<RecipeResponseDTO> searchRecipesByName(String searchTerm, Integer pageNumber) {
        Pageable page = PageRequest.of(pageNumber, RECORDS_PER_PAGE);
        List<Recipe> recipes = this.recipeRepository.findByNameContaining(searchTerm, page);
        List<RecipeResponseDTO> recipeResponseDTOS = new ArrayList<>();
        for (Recipe recipe : recipes) {
            RecipeResponseDTO recipeResponseDTO = getRecipeResponseDTO(recipe);
            recipeResponseDTOS.add(recipeResponseDTO);
        }
        return recipeResponseDTOS;
    }

}
