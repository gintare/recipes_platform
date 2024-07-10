package lt.techin.ovidijus.back.exceptions;

public class RequiredFieldIsEmptyException extends RuntimeException{

    public RequiredFieldIsEmptyException(String msg){
        super(msg);
    }
}
