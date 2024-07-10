package lt.techin.ovidijus.back.exceptions;

public class RecipeNotFoundException extends RuntimeException{

    public RecipeNotFoundException(String msg){
        super(msg);
    }
}
