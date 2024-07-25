package lt.techin.ovidijus.back.service;

import jakarta.persistence.Access;
import lt.techin.ovidijus.back.model.Like;
import lt.techin.ovidijus.back.model.Recipe;
import lt.techin.ovidijus.back.model.User;
import lt.techin.ovidijus.back.repository.LikeRepository;
import lt.techin.ovidijus.back.repository.RecipeRepository;
import lt.techin.ovidijus.back.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.Optional;

@Service
public class LikeService {

    private final LikeRepository likeRepository;
    private final UserRepository userRepository;
    private final RecipeRepository recipeRepository;

    @Autowired
    public LikeService(LikeRepository likeRepository, UserRepository repository, UserRepository userRepository, RecipeRepository recipeRepository) {
        this.likeRepository = likeRepository;
        this.userRepository = userRepository;
        this.recipeRepository = recipeRepository;
    }

    public Like addLike(Long recipeId, Long userId) {
        Like like = new Like();

        // Assuming you have methods to find User and Recipe entities

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id " + userId));
        Recipe recipe = recipeRepository.findById(recipeId)
                .orElseThrow(() -> new RuntimeException("Recipe not found with id " + recipeId));

        like.setUser(user);
        like.setRecipe(recipe);

        return likeRepository.save(like);
    }



    public void removeLike(Long recipeId, Long userId) {
        try {
            Like like = likeRepository.findByRecipeIdAndUserId(recipeId, userId)
                    .orElseThrow(() -> new RuntimeException("Like not found with recipeId " + recipeId + " and userId " + userId));
            likeRepository.delete(like);
            System.out.println("Successfully removed like for recipeId " + recipeId + " and userId " + userId);
        } catch (RuntimeException e) {
            System.err.println("Failed to remove like for recipeId " + recipeId + " and userId " + userId + ". Error: " + e.getMessage());
            throw new RuntimeException("Failed to remove like for recipeId " + recipeId + " and userId " + userId, e);
        }
    }

    public boolean checkUserLiked(Long recipeId, Long userId) {
        Optional<Like> like = likeRepository.findByRecipeIdAndUserId(recipeId, userId);
        return like.isPresent();
    }

    public Long getRecipeLikes(Long recipeId) {
        return likeRepository.countByRecipeId(recipeId);
    }
}
