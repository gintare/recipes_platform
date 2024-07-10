package lt.techin.ovidijus.back.repository;

import lt.techin.ovidijus.back.model.Ingredient;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IngredientRepository extends JpaRepository<Ingredient, Long> {
}
