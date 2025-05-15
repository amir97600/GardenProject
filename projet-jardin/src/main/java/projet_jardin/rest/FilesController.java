package projet_jardin.rest;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.MvcUriComponentsBuilder;


import projet_jardin.model.upload.FileInfo;
import projet_jardin.rest.response.message.ResponseMessage;
import projet_jardin.service.FileStorageService;

@Controller
@RequestMapping("/api")
public class FilesController {

    @Autowired
    FileStorageService storageService;
  
    @PostMapping("/upload")
    public ResponseEntity<ResponseMessage> uploadFile(@RequestParam MultipartFile file) {

      String message = "";
      
      try {
        storageService.save(file);
  
        message = "Le fichier a été uploadé avec succès: " + file.getOriginalFilename();
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessage(message));
      } catch (Exception e) {
        message = "L'upload du fichier n'a pas pu être effectué: " + file.getOriginalFilename() + ". Erreur: " + e.getMessage();
        return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new ResponseMessage(message));
      }
    }
  
    @GetMapping("/files")
    public ResponseEntity<List<FileInfo>> getListFiles() {

      List<FileInfo> fileInfos = storageService.loadAll().map(path -> {

        String filename = path.getFileName().toString();
        
        String url = MvcUriComponentsBuilder
            .fromMethodName(FilesController.class, "getFile", path.getFileName().toString()).build().toString();
  
        return new FileInfo(filename, url);
      }).collect(Collectors.toList());
  
      return ResponseEntity.status(HttpStatus.OK).body(fileInfos);
    }
  
    @GetMapping("/files/{filename:.+}")
    @ResponseBody
    public ResponseEntity<Resource> getFile(@PathVariable String filename) {
      Resource file = storageService.load(filename);
      return ResponseEntity.ok()
          .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFilename() + "\"").body(file);
    }
  }
