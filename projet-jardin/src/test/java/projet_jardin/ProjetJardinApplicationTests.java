package projet_jardin;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import projet_jardin.dao.IDAOCulture;
import projet_jardin.dao.IDAOJardin;
import projet_jardin.dao.IDAOPlante;
import projet_jardin.dao.IDAOUtilisateur;

@SpringBootTest
class ProjetJardinApplicationTests {
	
	@Autowired
	IDAOUtilisateur daoUtilisateur;
	
	@Autowired
	IDAOJardin daoJardin;
	
	@Autowired
	IDAOPlante daoPlante;
	
	@Autowired
	IDAOCulture daoCulture;
	
	@Test
	void contextLoads() {
	}

}
