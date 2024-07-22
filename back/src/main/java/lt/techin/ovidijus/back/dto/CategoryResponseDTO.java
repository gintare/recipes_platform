package lt.techin.ovidijus.back.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class CategoryResponseDTO {
    private Long id;
    private String name;
    private String message;

    public CategoryResponseDTO(String message) {
        this.message = message;
    }

    public CategoryResponseDTO(Long id, String message) {
        this.id = id;
        this.message = message;
    }

    public CategoryResponseDTO(String name, String message) {
        this.name = name;
        this.message = message;
    }
}
