package lt.techin.ovidijus.back.controller;

import lt.techin.ovidijus.back.dto.RecipeRequestDTO;
import lt.techin.ovidijus.back.dto.RecipeResponseDTO;
import lt.techin.ovidijus.back.dto.RecipeUpdateDTO;
import lt.techin.ovidijus.back.model.Recipe;
import lt.techin.ovidijus.back.service.RecipeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class RecipeController {

    RecipeService recipeService;

    public RecipeController(RecipeService recipeService) {
        this.recipeService = recipeService;
    }


    @PostMapping("/api/categories/{categoryId}/users/{userId}/recipes")
    public ResponseEntity<?> createRecipe(@PathVariable Long categoryId, @PathVariable Long userId, @RequestBody RecipeRequestDTO recipeRequestDTO){
        return ResponseEntity.status(HttpStatus.CREATED).body(this.recipeService.createRecipe(categoryId, userId, recipeRequestDTO));
    }


    @GetMapping("/api/recipes")
    public List<RecipeResponseDTO> findAllRecipes() {
        return this.recipeService.findAll();
    }

    @GetMapping("/api/recipes/pages/{pageNumber}")
    public List<RecipeResponseDTO> findRecipes(@PathVariable Integer pageNumber) {
        return this.recipeService.findAllByPageNumber(pageNumber);
    }

     @GetMapping("/api/categories/{categoryId}/recipes/pages/{pageNumber}")
    public List<RecipeResponseDTO> findRecipesByCategories(@PathVariable Long categoryId, @PathVariable Integer pageNumber) {
        return this.recipeService.findAllByCategoryAndPageNumber(categoryId, pageNumber);
    }

    @PutMapping("/api/categories/{categoryId}/recipes/{recipeId}")
    public ResponseEntity<?> updateRecipe(@PathVariable Long categoryId, @PathVariable Long recipeId, @RequestBody RecipeRequestDTO recipeRequestDTO){
         return ResponseEntity.ok(this.recipeService.updateRecipe(categoryId, recipeId, recipeRequestDTO));
    }

    @DeleteMapping("/api/recipes/{id}")
    public ResponseEntity<String> deleteRecipe(@PathVariable("id") Long recipeId){
    recipeService.deleteRecipe(recipeId);
    return ResponseEntity.ok("Recipe deleted successfully");
    }

    @PutMapping("/api/recipes/{id}")
    public ResponseEntity<String> updateRecipe(@PathVariable("id") Long recipeId,
                                               @RequestBody RecipeUpdateDTO recipeUpdateDTO) {
        recipeService.updateRecipe(recipeId, recipeUpdateDTO);
        return ResponseEntity.ok("Recipe updated successfully");
    }

    @GetMapping("/api/users/{userId}/recipes")
    public List<RecipeResponseDTO> findARecipesByUserId(@PathVariable Long userId) {
        return this.recipeService.findByUserId(userId);
    }

    @GetMapping("/api/recipes/{recipeId}")
    public RecipeResponseDTO findOneRecipe(@PathVariable Long recipeId) {
        return this.recipeService.findOneRecipe(recipeId);
    }
    @GetMapping("/api/search")
    public ResponseEntity<List<RecipeResponseDTO>> searchRecipes(
            @RequestParam String query,
            @RequestParam Integer page) {
        List<RecipeResponseDTO> recipes = recipeService.searchRecipesByName(query, page);
        return ResponseEntity.ok(recipes);
    }

    }
