package lt.techin.ovidijus.back.repository;

import lt.techin.ovidijus.back.model.Like;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LikeRepository extends JpaRepository<Like, Long> {
    Optional<Like> findByRecipeIdAndUserId(Long recipeId, Long userId);
    Long countByRecipeId(Long recipeId);
    void deleteByRecipeIdAndUserId(Long recipeId, Long userId);
}
