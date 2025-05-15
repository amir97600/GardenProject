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
	
		Jardin jardin1 = new Jardin("Jardin d'alpha", "Paris", 14);
		client1.setJardin(jardin1);
		Jardin jardin2 = new Jardin("Jardin de toto", "Marseille", 28);
		client2.setJardin(jardin2);
		

		
		FruitLegume carotte = new FruitLegume("Carotte", "Une carotte bien croquante", "Enterrez-les profondément et arrosez généreusement", 4, 30, 2, "carotte_icone","carotte.jpg");
		FruitLegume fraise = new FruitLegume("Fraise", "Une fraise sucrée et parfumée", "Plantez-les à l’ombre partielle et paillez bien", 5, 25, 3, "fraise_icone","fraise.jpeg");
		FruitLegume tomate = new FruitLegume("Tomate", "Une tomate rouge bien juteuse", "Offrez-lui un bon tuteur et du soleil", 6, 40, 3, "tomate_icone","tomate.jpg");
		Fleur tulipe = new Fleur("Tulipe", "Des tulipes hors du commun", "Plantez les à 15h précises", 2, 14, 1, false, "tulipe_icone","tulipe.jpg");
		FruitLegume oignon = new FruitLegume("Oignon", "Un oignon plein de caractère", "Évitez l’excès d’humidité et espacez les rangs", 4, 28, 2, "oignon_icone","oignon.jpg");
		Fleur tournesol = new Fleur("Tournesol", "Un grand soleil dans votre jardin", "Exposez-les plein sud et arrosez modérément", 3, 20, 2, false, "tournesol_icone","tournesol.jpeg");
		FruitLegume raisin = new FruitLegume("Raisin", "De belles grappes sucrées", "Taillez régulièrement les rameaux pour aérer", 6, 45, 3, "raisins_icone","raisin.jpg");

		Culture cult1 = new Culture(4, LocalDate.now(), LocalDate.now(), false, jardin1, carotte);
		Culture cult2 = new Culture(24, LocalDate.now(), LocalDate.now(), false, jardin1, tulipe);
		Culture cult3 = new Culture(24, LocalDate.now(), LocalDate.now(), false, jardin2, tomate);
		Culture cult4 = new Culture(5, LocalDate.now(), LocalDate.now(), false, jardin2, fraise);
		
		List<Badge> badges = client2.getBadges();
		
		Badge badge1 = Badge.CultivateurAppliqué;
		Badge badge2 = Badge.GraineDeNovice;
		badges.add(badge1);
		badges.add(badge2);
		

		daojardin.save(jardin1);
		daojardin.save(jardin2);
		
		daoutilisateur.save(admin);
		daoutilisateur.save(client1);
		daoutilisateur.save(client2);
		

		daoplante.save(carotte);
		daoplante.save(fraise);
		daoplante.save(tomate);
		daoplante.save(tulipe);
		daoplante.save(oignon);
		daoplante.save(tournesol);		
		daoplante.save(raisin);
		
		daoculture.save(cult1);
		daoculture.save(cult2);
		daoculture.save(cult3);
		daoculture.save(cult4);		
		

	}

}
