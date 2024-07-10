package lt.techin.ovidijus.back.service;

import lt.techin.ovidijus.back.dto.CategoryResponseDTO;
import lt.techin.ovidijus.back.model.Category;
import lt.techin.ovidijus.back.repository.CategoryRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public List<CategoryResponseDTO> selectAll() {
        List<Category> categories = this.categoryRepository.findAll();
        List<CategoryResponseDTO> categoriesDTOS = new ArrayList<>();
        for(Category cat : categories){
            CategoryResponseDTO catDTO = new CategoryResponseDTO();
            catDTO.setId(cat.getId());
            catDTO.setName(cat.getName());
            categoriesDTOS.add(catDTO);
        }
        return categoriesDTOS;
    }

}
