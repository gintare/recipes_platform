package lt.techin.ovidijus.back.controller;

import lt.techin.ovidijus.back.dto.CategoryResponseDTO;
import lt.techin.ovidijus.back.service.CategoryService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class CategoryController {

    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping("/api/categories")
    public List<CategoryResponseDTO> findAllCategories() {
        return categoryService.selectAll();
    }
}
