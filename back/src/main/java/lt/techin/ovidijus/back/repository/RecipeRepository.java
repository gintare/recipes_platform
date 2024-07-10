package lt.techin.ovidijus.back.repository;

import lt.techin.ovidijus.back.model.Recipe;
import lt.techin.ovidijus.back.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RecipeRepository extends JpaRepository<Recipe, Long>  {
}
