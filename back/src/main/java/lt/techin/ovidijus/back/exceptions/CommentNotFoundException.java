package lt.techin.ovidijus.back.exceptions;

public class CommentNotFoundException extends RuntimeException{

    public CommentNotFoundException(String msg) {
        super(msg);
    }
}
