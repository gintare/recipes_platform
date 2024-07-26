package lt.techin.ovidijus.back.controller;

import lt.techin.ovidijus.back.dto.CategoryRequestDTO;
import lt.techin.ovidijus.back.dto.CategoryResponseDTO;
import lt.techin.ovidijus.back.exceptions.CategoryNotFoundException;
import lt.techin.ovidijus.back.exceptions.NotAdminException;
import lt.techin.ovidijus.back.model.Category;
import lt.techin.ovidijus.back.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Category> createCategory(@RequestBody CategoryRequestDTO categoryRequestDTO) throws NotAdminException {
        Category newCategory = categoryService.createCategory(categoryRequestDTO);
        return new ResponseEntity<>(newCategory, HttpStatus.CREATED);
    }

    @DeleteMapping("/api/categories/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> deleteCategory(@PathVariable long id) throws CategoryNotFoundException, NotAdminException {
        categoryService.deleteCategory(id);
        return ResponseEntity.ok("Category deleted");
    }

    @PatchMapping("/api/categories/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<CategoryResponseDTO> updateCategory(@PathVariable long id, @RequestBody CategoryRequestDTO categoryRequestDTO) {
        try {
            CategoryResponseDTO updatedCategory = categoryService.updateCategory(id, categoryRequestDTO);
            return new ResponseEntity<>(updatedCategory, HttpStatus.OK);
        } catch (CategoryNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (NotAdminException e) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/api/categories/{id}")
    public ResponseEntity<?> getOneCategory(@PathVariable long id) {
        return ResponseEntity.ok(this.categoryService.getOneCategory(id));
    }

}
