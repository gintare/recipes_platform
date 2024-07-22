package lt.techin.ovidijus.back.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Table(name = "recipe")
@Getter
@Setter
@NoArgsConstructor
public class Recipe {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    private String name;

    @Column(columnDefinition = "text")
    private String image;

    @Column(columnDefinition = "text")
    private String description;

    @Column(columnDefinition = "text")
    private String instructions;

    @Column(name = "time_in_minutes")
    private int timeInMinutes;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;

    @OneToMany(mappedBy = "recipe", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Like> likes = new HashSet<>();
    
    @NotNull
    @OneToMany(mappedBy = "recipe", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Ingredient> ingredients = new LinkedHashSet<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    public void addCategory(Category category) {
        this.category = category;
        this.category.getRecipes().add(this);
    }

    public void removeCategory() {
        this.category.getRecipes().remove(this);
        this.category = null;
    }

    public void addUser(User user) {
        this.user = user;
        this.user.getRecipes().add(this);
    }

    public void removeUser() {
        this.user.getRecipes().remove(this);
        this.user = null;
    }

}
