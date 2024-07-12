package lt.techin.ovidijus.back.controller;

import lt.techin.ovidijus.back.dto.CategoryResponseDTO;
import lt.techin.ovidijus.back.exceptions.CategoryNotFoundException;
import lt.techin.ovidijus.back.exceptions.NotAdminException;
import lt.techin.ovidijus.back.model.Category;
import lt.techin.ovidijus.back.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping
public class CategoryController {

    private final CategoryService categoryService;

    @Autowired
    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping("/api/categories")
    public List<CategoryResponseDTO> findAllCategories() {
        return categoryService.selectAll();
    }

//    @GetMapping("/api/categories")
//    public ResponseEntity<List<Category>> getAllCategories() {
//        List<Category> categories = categoryService.getAllCategories();
//        return new ResponseEntity<>(categories, HttpStatus.OK);
//    }

    @PostMapping("/api/categories")
    public ResponseEntity<Category> createCategory(@RequestBody CategoryResponseDTO categoryResponseDTO) throws NotAdminException {
        Category newCategory = categoryService.createCategory(categoryResponseDTO);
        return new ResponseEntity<>(newCategory, HttpStatus.CREATED);
    }

    @DeleteMapping("/api/categories/{id}")
    public void deleteCategory(@PathVariable long id) throws CategoryNotFoundException, NotAdminException {
        categoryService.deleteCategory(id);
    }

    @PatchMapping("/api/categories/{id}")
    public ResponseEntity<Category> updateCategory(@PathVariable long id, @RequestBody Category category) {
        try {
            Category updatedCategory = categoryService.updateCategory(id, category);
            return new ResponseEntity<>(updatedCategory, HttpStatus.OK);
        } catch (CategoryNotFoundException | NotAdminException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
