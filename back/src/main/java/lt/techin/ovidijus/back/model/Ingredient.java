package lt.techin.ovidijus.back.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "ingredient")
@Getter
@Setter
@NoArgsConstructor
public class Ingredient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "recipe_id")
    Recipe recipe;

    public void addRecipe(Recipe recipe) {
        this.recipe = recipe;
        this.recipe.getIngredients().add(this);
    }

    public void removeRecipe() {
        this.recipe.getIngredients().remove(this);
        this.recipe = null;
    }
}
