package lt.techin.ovidijus.back.exceptions;

public class ImageNotFoundException extends RuntimeException{

    public ImageNotFoundException(String msg){
        super(msg);
    }
}
