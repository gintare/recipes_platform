package lt.techin.ovidijus.back.controller;

import lombok.AllArgsConstructor;
import lt.techin.ovidijus.back.service.FavoriteService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@CrossOrigin(origins = "*")
public class FavoriteController {

    private final FavoriteService favoriteService;

    @PostMapping("/api/users/{userId}/recipes/{recipeId}/favorites")
    public ResponseEntity<?> createFavorite(@PathVariable Long userId, @PathVariable Long recipeId) {
        return ResponseEntity.status(HttpStatus.CREATED).body(favoriteService.createFavorite(userId, recipeId));
    }

    @GetMapping("/api/users/{userId}/recipes/{recipeId}/favorites")
    public ResponseEntity<?> isFavorite(@PathVariable Long userId, @PathVariable Long recipeId) {
        return ResponseEntity.ok(favoriteService.isFavorite(userId, recipeId));
    }

    @DeleteMapping("/api/users/{userId}/recipes/{recipeId}/favorites")
    public void deleteFavorite(@PathVariable Long userId, @PathVariable Long recipeId) {
        favoriteService.deleteFavorite(userId, recipeId);
    }

}
