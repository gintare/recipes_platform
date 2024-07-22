package lt.techin.ovidijus.back.service;

import lombok.AllArgsConstructor;
import lt.techin.ovidijus.back.dto.CommentRequestDTO;
import lt.techin.ovidijus.back.dto.CommentResponseDTO;
import lt.techin.ovidijus.back.exceptions.RecipeNotFoundException;
import lt.techin.ovidijus.back.exceptions.UserNotFoundException;
import lt.techin.ovidijus.back.model.Comment;
import lt.techin.ovidijus.back.model.Recipe;
import lt.techin.ovidijus.back.model.User;
import lt.techin.ovidijus.back.repository.CommentRepository;
import lt.techin.ovidijus.back.repository.RecipeRepository;
import lt.techin.ovidijus.back.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
@AllArgsConstructor
public class CommentService {

    private final UserRepository userRepository;
    private final RecipeRepository recipeRepository;
    private final CommentRepository commentRepository;

    public CommentResponseDTO createComment(Long userId, Long recipeId, CommentRequestDTO commentRequestDTO) {
        User user = userRepository.findById(userId).orElseThrow(() -> new UserNotFoundException("No user found by user id ="+userId));
        Recipe recipe = recipeRepository.findById(recipeId).orElseThrow(()->new RecipeNotFoundException("Recipe not found with an id = "+recipeId));

        Comment comment = new Comment();
        comment.setText(commentRequestDTO.getText());
        comment.setUser(user);
        comment.setRecipe(recipe);
        comment.setCreatedAt(new Date());
        commentRepository.save(comment);

        CommentResponseDTO commentResponseDTO = new CommentResponseDTO();
        commentResponseDTO.setId(comment.getId());
        commentResponseDTO.setText(comment.getText());
        commentResponseDTO.setUserId(comment.getUser().getId());
        commentResponseDTO.setRecipeId(comment.getRecipe().getId());
        commentResponseDTO.setCreatedAt(comment.getCreatedAt());
        return commentResponseDTO;
    }

    public List<CommentResponseDTO> findByRecipe(Long recipeId) {
        Recipe recipe = recipeRepository.findById(recipeId).orElseThrow(()->new RecipeNotFoundException("Recipe not found with an id = "+recipeId));
        commentRepository.findByRecipe(recipe);
        return null;
    }
}
