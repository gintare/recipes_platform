package lt.techin.ovidijus.back.service;

import lt.techin.ovidijus.back.dto.CategoryRequestDTO;
import lt.techin.ovidijus.back.dto.CategoryResponseDTO;
import lt.techin.ovidijus.back.exceptions.CategoryNotFoundException;
import lt.techin.ovidijus.back.exceptions.NotAdminException;
import lt.techin.ovidijus.back.model.Category;
import lt.techin.ovidijus.back.model.User;
import lt.techin.ovidijus.back.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Pattern;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;
    private final UserService userService;

    @Autowired
    public CategoryService(CategoryRepository categoryRepository, UserService userService) {
        this.categoryRepository = categoryRepository;
        this.userService = userService;
    }

    public List<CategoryResponseDTO> selectAll() {
        List<Category> categories = this.categoryRepository.findAll();
        List<CategoryResponseDTO> categoriesDTOS = new ArrayList<>();
        for (Category cat : categories) {
            CategoryResponseDTO catDTO = new CategoryResponseDTO();
            catDTO.setId(cat.getId());
            catDTO.setName(cat.getName());
            categoriesDTOS.add(catDTO);
        }
        return categoriesDTOS;
    }

//    public List<Category> getAllCategories() {
//        return categoryRepository.findAll();
//    }

    public Category createCategory(CategoryRequestDTO categoryRequestDTO) throws NotAdminException {
        User user = checkAuthorized();
        if (!user.getRole().equals("ADMIN")) {
            throw new NotAdminException("Only admins can create categories!");
        }
        if (categoryRepository.existsByName(categoryRequestDTO.getName())) {
            throw new RuntimeException("Category already exists!");
        }

        validateCategory(categoryRequestDTO.getName());
        Category category = new Category();
        category.setName(categoryRequestDTO.getName());

        return categoryRepository.save(category);
    }

    public CategoryResponseDTO updateCategory(long id, CategoryRequestDTO categoryRequestDTO) throws CategoryNotFoundException, NotAdminException {
        User user = checkAuthorized();
        if (!user.getRole().equals("ADMIN")) {
            throw new NotAdminException("Only admins can update categories!");
        }

        Category existingCategory = categoryRepository.findById(id)
                .orElseThrow(() -> new CategoryNotFoundException("Category not found"));

        validateCategory(categoryRequestDTO.getName());

        if (categoryRequestDTO.getName() != null) {
            if (categoryRepository.existsByName(categoryRequestDTO.getName())){
                return new CategoryResponseDTO(existingCategory.getId(), "Category already exists!");
            }
            existingCategory.setName(categoryRequestDTO.getName());
        }
        categoryRepository.save(existingCategory);

        return new CategoryResponseDTO(existingCategory.getId(), existingCategory.getName(), "Category updated!");
    }

    public void deleteCategory(long id) throws CategoryNotFoundException, NotAdminException {
        User user = checkAuthorized();
        if (!user.getRole().equals("ADMIN")) {
            throw new NotAdminException("Only admins can delete categories!");
        }
        if (categoryRepository.existsById(id)) {
            categoryRepository.deleteById(id);
        } else {
            throw new CategoryNotFoundException("Category not found!");
        }
    }

    public User checkAuthorized() {
        return userService.getCurrentUser()
                .orElseThrow(() -> new RuntimeException("Not authorized"));
    }

    public void validateCategory(String name) {
        int min = 3;
        int max = 15;

        if (name.isEmpty() || name.isBlank()) {
            throw new IllegalArgumentException(String.format("Category name cannot be empty %n"));
        }
        if (name.length() < min) {
            String minMessage = min == 1 ? "character" : "characters";
            throw new IllegalArgumentException(String.format("Category name must be at least %d %s %n", min, minMessage));
        }
        if (name.length() > max) {
            throw new IllegalArgumentException(String.format("Category name cannot exceed %d characters", max));
        }
        if (!Pattern.matches("^[a-zA-Z]+( [a-zA-Z]+)*$", name)) {
            throw new IllegalArgumentException("Category name can only contain letters and a single space between words");
        }
    }

    public CategoryResponseDTO getOneCategory(long id) {
        Category category = this.categoryRepository.findById(id).orElseThrow(() -> new CategoryNotFoundException("No category found with an id = " + id));

        CategoryResponseDTO categoryResponseDTO = new CategoryResponseDTO();
        categoryResponseDTO.setId(category.getId());
        categoryResponseDTO.setName(category.getName());
        return categoryResponseDTO;
    }
}
