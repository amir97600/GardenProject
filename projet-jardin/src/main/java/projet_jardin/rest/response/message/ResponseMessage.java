package projet_jardin.rest.response.message;

public class ResponseMessage {
    private String message;
    private String fileName;
  
    public ResponseMessage(String message, String fileName) {
      this.message = message;
      this.fileName = fileName;
    }
  
    public String getMessage() {
      return message;
    }
  
    public void setMessage(String message) {
      this.message = message;
    }

    public String getFileName() {
      return fileName;
    }

    public void setFileName(String fileName) {
      this.fileName = fileName;
    }

    
  
}