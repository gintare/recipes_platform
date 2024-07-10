package lt.techin.ovidijus.back.exceptions;

public class CategoryNotFoundException extends RuntimeException{

    public CategoryNotFoundException(String msg){
        super(msg);
    }
}
