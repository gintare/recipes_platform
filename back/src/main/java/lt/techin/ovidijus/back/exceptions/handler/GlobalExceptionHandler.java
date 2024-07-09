//package lt.techin.ovidijus.back.exceptions.handler;
//
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.ExceptionHandler;
//import org.springframework.web.bind.annotation.RestControllerAdvice;
//
//@RestControllerAdvice
//public class GlobalExceptionHandler {
//
//    @ExceptionHandler(Somethin.class)
//    public ResponseEntity<ErrorDetails> exceptionSomethingNotFoundHandler(SomethingNotFoundException ex) {
//        ErrorDetails errorDetails = new ErrorDetails(ex.getMessage());
//        return new ResponseEntity<>(errorDetails, HttpStatus.BAD_REQUEST);
//    }
//}
