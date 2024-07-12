package lt.techin.ovidijus.back.service;

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

    public Category createCategory(CategoryResponseDTO categoryResponseDTO) throws NotAdminException {
        User user = checkAuthorized();
        if (!user.getRole().equals("ADMIN")) {
            throw new NotAdminException("Only admins can create categories!");
        }
        if (categoryRepository.existsByName(categoryResponseDTO.getName())) {
            throw new RuntimeException("Category already exists!");
        }

        Category category = new Category();
        category.setName(categoryResponseDTO.getName());

        return categoryRepository.save(category);
    }

    public Category updateCategory(long id, Category category) throws CategoryNotFoundException, NotAdminException {
        User user = checkAuthorized();
        if (!user.getRole().equals("ADMIN")) {
            throw new NotAdminException("Only admins can update categories!");
        }

        Category existingCategory = categoryRepository.findById(id)
                .orElseThrow(() -> new CategoryNotFoundException("Category not found"));

        if (category.getName() != null) {
            existingCategory.setName(category.getName());
        }
        return categoryRepository.save(existingCategory);
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
}
