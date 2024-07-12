package lt.techin.ovidijus.back.repository;

import lt.techin.ovidijus.back.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {

    public Category findByName(String name);

    boolean existsByName(String name);
}
