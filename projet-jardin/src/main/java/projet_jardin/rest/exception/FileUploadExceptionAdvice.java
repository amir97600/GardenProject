package projet_jardin.rest.exception;

import org.springframework.web.multipart.MaxUploadSizeExceededException;

import projet_jardin.rest.FilesController;
import projet_jardin.rest.response.message.ResponseMessage;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice(assignableTypes = {FilesController.class})
public class FileUploadExceptionAdvice  {

  @ExceptionHandler(MaxUploadSizeExceededException.class)
  public ResponseEntity<ResponseMessage> handleMaxSizeException(MaxUploadSizeExceededException exc) {
    return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new ResponseMessage("Fichier trop volumineux!"));
  }
}