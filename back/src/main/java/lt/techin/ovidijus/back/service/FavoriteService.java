package lt.techin.ovidijus.back.service;

import lombok.AllArgsConstructor;
import lt.techin.ovidijus.back.dto.FavoriteResponseDTO;
import lt.techin.ovidijus.back.exceptions.RecipeNotFoundException;
import lt.techin.ovidijus.back.exceptions.UserNotFoundException;
import lt.techin.ovidijus.back.model.Favorite;
import lt.techin.ovidijus.back.model.Follower;
import lt.techin.ovidijus.back.model.Recipe;
import lt.techin.ovidijus.back.model.User;
import lt.techin.ovidijus.back.repository.FavoriteRepository;
import lt.techin.ovidijus.back.repository.RecipeRepository;
import lt.techin.ovidijus.back.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@AllArgsConstructor
public class FavoriteService {

    private final UserRepository userRepository;
    private final RecipeRepository recipeRepository;
    private final FavoriteRepository favoriteRepository;

    public FavoriteResponseDTO createFavorite(Long userId, Long recipeId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new UserNotFoundException("No user found by id = "+userId));
        Recipe recipe = recipeRepository.findById(recipeId).orElseThrow(() -> new RecipeNotFoundException("no recipe found by id ="+recipeId));

        Favorite favorite = new Favorite();
        favorite.setUser(user);
        favorite.setRecipe(recipe);
        favorite.setCreatedAt(new Date());
        favoriteRepository.save(favorite);

        FavoriteResponseDTO favoriteResponseDTO = new FavoriteResponseDTO();
        favoriteResponseDTO.setId(favorite.getId());
        favoriteResponseDTO.setUserId(favorite.getUser().getId());
        favoriteResponseDTO.setRecipeId(favorite.getRecipe().getId());
        favoriteResponseDTO.setCreatedAt(favorite.getCreatedAt());
        return favoriteResponseDTO;
    }

    public boolean isFavorite(Long userId, Long recipeId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new UserNotFoundException("No user found by id = "+userId));
        Recipe recipe = recipeRepository.findById(recipeId).orElseThrow(() -> new RecipeNotFoundException("no recipe found by id ="+recipeId));

        List<Favorite> favorites = favoriteRepository.getByUserAndByRecipe(user, recipe);

        return !favorites.isEmpty();
    }

    public void deleteFavorite(Long userId, Long recipeId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new UserNotFoundException("No user found by id = "+userId));
        Recipe recipe = recipeRepository.findById(recipeId).orElseThrow(() -> new RecipeNotFoundException("no recipe found by id ="+recipeId));

        List<Favorite> favorites = favoriteRepository.getByUserAndByRecipe(user, recipe);
        for(Favorite favorite: favorites){
            favoriteRepository.delete(favorite);
        }
    }

    public List<FavoriteResponseDTO> findFavoritesByUserId(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new UserNotFoundException("No user found by id = "+userId));
        List<Favorite> favorites = this.favoriteRepository.findByUser(user);

        List<FavoriteResponseDTO> favoriteResponseDTOS = new ArrayList<>();
        for(Favorite favorite: favorites){
            FavoriteResponseDTO favoriteResponseDTO = new FavoriteResponseDTO();
            favoriteResponseDTO.setId(favorite.getId());
            favoriteResponseDTO.setUserId(favorite.getUser().getId());
            favoriteResponseDTO.setRecipeId(favorite.getRecipe().getId());
            favoriteResponseDTO.setCreatedAt(favorite.getCreatedAt());
            favoriteResponseDTO.setRecipeImage(favorite.getRecipe().getImage());
            favoriteResponseDTO.setRecipeName(favorite.getRecipe().getName());
            favoriteResponseDTO.setRecipeTimeInMinutes(favorite.getRecipe().getTimeInMinutes());
            favoriteResponseDTO.setRecipeAmountOfLikes((int)favorite.getRecipe().getLikes().stream().count());
            favoriteResponseDTOS.add(favoriteResponseDTO);
        }
        return favoriteResponseDTOS;
    }
}
