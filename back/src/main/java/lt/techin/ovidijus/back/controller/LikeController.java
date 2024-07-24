package lt.techin.ovidijus.back.controller;


import lt.techin.ovidijus.back.service.LikeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/recipes")
@CrossOrigin("*")
public class LikeController {

    @Autowired
    private LikeService likeService;

    @PostMapping("/{recipeId}/users/{userId}")
    public ResponseEntity<?> addLike(@PathVariable Long recipeId, @PathVariable Long userId) {
        try {
            System.out.println("Adding like for recipeId: " + recipeId + " and userId: " + userId);
            likeService.addLike(recipeId, userId);
            return ResponseEntity.status(201).body("Like added");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Failed to add like");
        }
    }


    @DeleteMapping("/{recipeId}/users/{userId}")
    public ResponseEntity<?> removeLike(@PathVariable Long recipeId, @PathVariable Long userId) {
        try {
            likeService.removeLike(recipeId, userId);
            return ResponseEntity.status(200).body("Like removed");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Failed to remove like");
        }
    }

    @GetMapping("/{recipeId}/users/{userId}")
    public ResponseEntity<?> checkUserLiked(@PathVariable Long recipeId, @PathVariable Long userId) {
        try {
            boolean liked = likeService.checkUserLiked(recipeId, userId);
            return ResponseEntity.ok(liked);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Failed to check like status");
        }
    }

    @GetMapping("/{recipeId}/likes")
    public ResponseEntity<?> getRecipeLikes(@PathVariable Long recipeId) {
        try {
            Long likes = likeService.getRecipeLikes(recipeId);
            return ResponseEntity.ok(likes);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Failed to get likes");
        }
    }
}
