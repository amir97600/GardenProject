package test_projet.test;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;

import test_projet.dao.IDAOCulture;
import test_projet.dao.IDAOJardin;
import test_projet.dao.IDAOPlante;
import test_projet.dao.IDAOUtilisateur;
import test_projet.model.Admin;
import test_projet.model.Client;
import test_projet.model.Culture;
import test_projet.model.Fleur;
import test_projet.model.FruitLegume;
import test_projet.model.Jardin;

public class TestSpring {
	
	@Autowired
	IDAOUtilisateur daoutilisateur;
	@Autowired
	IDAOJardin daojardin;
	@Autowired
	IDAOPlante daoplante;
	@Autowired
	IDAOCulture daoculture;

	public void run() 
	{
		Admin admin = new Admin("admin", "admin");
		Client client1 = new Client("log1", "pass1", "alpha", "beta");
		Client client2 = new Client("log2", "pass2", "toto", "titi");
		
		Fleur fleur = new Fleur("Rose", "Une beauté piquante", 2, 14, 1, false);
		FruitLegume fl = new FruitLegume("Pomme", "Une pomme verte", 5, 21, 2);
		
		Jardin jardin1 = new Jardin("Jardin d'alpha", "Paris", 14);
		client1.setJardin(jardin1);
		Jardin jardin2 = new Jardin("Jardin de toto", "Marseille", 28);
		client2.setJardin(jardin2);
		
		Culture cult1 = new Culture(4, LocalDate.now(), LocalDate.now(), false, jardin1, fl);
		Culture cult2 = new Culture(24, LocalDate.now(), LocalDate.now(), false, jardin1, fleur);
		Culture cult3 = new Culture(24, LocalDate.now(), LocalDate.now(), false, jardin2, fl);
		Culture cult4 = new Culture(5, LocalDate.now(), LocalDate.now(), false, jardin2, fleur);
		
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
