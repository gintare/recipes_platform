package lt.techin.ovidijus.back.repository;

import lt.techin.ovidijus.back.model.Recipe;
import lt.techin.ovidijus.back.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Collection;
import java.util.List;

public interface RecipeRepository extends JpaRepository<Recipe, Long>  {

    List<Recipe> findAllRecipesByUserId(Long userId);

    List<Recipe> findByUser(User user);

//    @Query("SELECT u FROM Recipe u WHERE u.user.id = 1")
//    Collection<Recipe> findByUser();
}
