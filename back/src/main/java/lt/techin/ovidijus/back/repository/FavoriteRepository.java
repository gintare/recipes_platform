package lt.techin.ovidijus.back.repository;

import lt.techin.ovidijus.back.model.Category;
import lt.techin.ovidijus.back.model.Favorite;
import lt.techin.ovidijus.back.model.Recipe;
import lt.techin.ovidijus.back.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface FavoriteRepository extends JpaRepository<Favorite, Long> {

    @Query("select u from Favorite u where u.user = ?1 and u.recipe = ?2")
    List<Favorite> getByUserAndByRecipe(User user, Recipe recipe);


    List<Favorite> findByUser(User user);


}
