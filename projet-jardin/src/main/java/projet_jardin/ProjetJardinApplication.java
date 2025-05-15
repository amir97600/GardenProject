package projet_jardin;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import jakarta.annotation.Resource;
import projet_jardin.service.FileStorageService;

@SpringBootApplication
public class ProjetJardinApplication implements CommandLineRunner{

	@Resource
  	FileStorageService storageService;

	public static void main(String[] args) {
		SpringApplication.run(ProjetJardinApplication.class, args);
	}

	@Override
	public void run(String... arg) throws Exception {
  	//    storageService.deleteAll();
	  storageService.init();
	}

}
