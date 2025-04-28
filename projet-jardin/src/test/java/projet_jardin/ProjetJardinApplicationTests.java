package projet_jardin;

import java.time.LocalDate;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import projet_jardin.dao.IDAOCulture;
import projet_jardin.dao.IDAOJardin;
import projet_jardin.dao.IDAOPlante;
import projet_jardin.dao.IDAOUtilisateur;
import projet_jardin.model.Admin;
import projet_jardin.model.Badge;
import projet_jardin.model.Client;
import projet_jardin.model.Culture;
import projet_jardin.model.Fleur;
import projet_jardin.model.FruitLegume;
import projet_jardin.model.Jardin;


@SpringBootTest
class ProjetJardinApplicationTests {
	
	@Autowired
	IDAOUtilisateur daoutilisateur;
	@Autowired
	IDAOJardin daojardin;
	@Autowired
	IDAOPlante daoplante;
	@Autowired
	IDAOCulture daoculture;
	
	@Test
	void contextLoads() {
		
		Admin admin = new Admin("admin", "admin");
		Client client1 = new Client("log1", "pass1", "alpha", "beta");
		Client client2 = new Client("log2", "pass2", "toto", "titi");
		
		Fleur fleur = new Fleur("Rose", "Une beauté piquante","A ceuillir avec des pincettes", 2, 14, 1, false);
		FruitLegume fl = new FruitLegume("Pomme", "Une pomme verte","Attention à ne pas tomber dans les pommes", 5, 21, 2);
		
		Jardin jardin1 = new Jardin("Jardin d'alpha", "Paris", 14);
		client1.setJardin(jardin1);
		Jardin jardin2 = new Jardin("Jardin de toto", "Marseille", 28);
		client2.setJardin(jardin2);
		
		Culture cult1 = new Culture(4, LocalDate.now(), LocalDate.now(), false, jardin1, fl);
		Culture cult2 = new Culture(24, LocalDate.now(), LocalDate.now(), false, jardin1, fleur);
		Culture cult3 = new Culture(24, LocalDate.now(), LocalDate.now(), false, jardin2, fl);
		Culture cult4 = new Culture(5, LocalDate.now(), LocalDate.now(), false, jardin2, fleur);
		
		List<Badge> badges = client2.getBadges();
		
		Badge badge1 = Badge.CultivateurAppliqué;
		Badge badge2 = Badge.GraineDeNovice;
		badges.add(badge1);
		badges.add(badge2);
		
		
		daoplante.save(fleur);
		daoplante.save(fl);
		
		daojardin.save(jardin1);
		daojardin.save(jardin2);
		
		daoutilisateur.save(admin);
		daoutilisateur.save(client1);
		daoutilisateur.save(client2);
		
		daoculture.save(cult1);
		daoculture.save(cult2);
		daoculture.save(cult3);
		daoculture.save(cult4);
	}

}
