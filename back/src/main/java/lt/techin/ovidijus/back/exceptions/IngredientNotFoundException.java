package lt.techin.ovidijus.back.exceptions;

public class IngredientNotFoundException extends RuntimeException {

    public IngredientNotFoundException(String msg){
        super(msg);
    }
}
