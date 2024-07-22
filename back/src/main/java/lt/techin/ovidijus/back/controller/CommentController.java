package lt.techin.ovidijus.back.controller;

import lombok.AllArgsConstructor;
import lt.techin.ovidijus.back.dto.CommentRequestDTO;
import lt.techin.ovidijus.back.dto.CommentResponseDTO;
import lt.techin.ovidijus.back.service.CommentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@CrossOrigin(origins = "*")
public class CommentController {

    private final CommentService commentService;

    @PostMapping("/api/users/{userId}/recipes/{recipeId}/comments")
    public ResponseEntity<?> createComment(@PathVariable Long userId, @PathVariable Long recipeId, @RequestBody CommentRequestDTO commentRequestDTO){
        return ResponseEntity.status(HttpStatus.CREATED).body(commentService.createComment(userId, recipeId, commentRequestDTO));
    }

    @GetMapping("/api/recipes/{recipeId}/comments")
    public List<CommentResponseDTO> findCommentsByRecipe(@PathVariable Long recipeId){
        return commentService.findByRecipe(recipeId);
    }

    @DeleteMapping("/api/comments/{commentId}")
    public ResponseEntity<?> deleteComment(@PathVariable Long commentId){
        return ResponseEntity.ok(commentService.deleteComment(commentId));
    }

}
