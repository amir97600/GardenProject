package projet_jardin;

import java.time.LocalDate;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;

import projet_jardin.dao.IDAOCulture;
import projet_jardin.dao.IDAOJardin;
import projet_jardin.dao.IDAOPlante;
import projet_jardin.dao.IDAOUtilisateur;
import projet_jardin.model.Admin;
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

	@Autowired
	PasswordEncoder passwordEncoder;
	
	@Test
	void contextLoads() {
		
		// Encodage des mots de passe avant création des objets
		String adminPasswordEncoded = passwordEncoder.encode("admin");
		String client1PasswordEncoded = passwordEncoder.encode("pass1");
		String client2PasswordEncoded = passwordEncoder.encode("pass2");
		
		Admin admin = new Admin("admin", adminPasswordEncoded);
		Client client1 = new Client("log1", client1PasswordEncoded, "alpha", "beta");
		Client client2 = new Client("log2", client2PasswordEncoded, "toto", "titi");
		
		Jardin jardin1 = new Jardin("Jardin d'alpha", "Paris");
		client1.setJardin(jardin1);
		Jardin jardin2 = new Jardin("Jardin de toto", "Marseille");
		client2.setJardin(jardin2);
		
		
		FruitLegume carotte = new FruitLegume("Carotte", "Une carotte bien croquante", "Enterrez-les profondément et arrosez généreusement", 60, 365, 4, "carotte_icone.png","carotte.jpg");
		FruitLegume fraise = new FruitLegume("Fraise", "Une fraise sucrée et parfumée", "Plantez-les à l’ombre partielle et paillez bien", 25, 730, 2, "fraise_icone.png","fraise.jpg");
		FruitLegume tomate = new FruitLegume("Tomate", "Une tomate rouge bien juteuse", "Offrez-lui un bon tuteur et du soleil", 40, 150, 2, "tomate_icone.png","tomate.jpg");
		Fleur tulipe = new Fleur("Tulipe", "Des tulipes hors du commun", "Plantez les à 15h précises", 14, 365, 4, false, "tulipe_icone.png","tulipe.jpg");
		FruitLegume oignon = new FruitLegume("Oignon", "Un oignon plein de caractère", "Évitez l’excès d’humidité et espacez les rangs", 28, 180, 3, "oignon_icone.png","oignon.jpg");
		Fleur tournesol = new Fleur("Tournesol", "Un grand soleil dans votre jardin", "Exposez-les plein sud et arrosez modérément", 80, 120, 3, false, "tournesol_icone.png","tournesol.jpg");
		FruitLegume raisin = new FruitLegume("Raisin", "De belles grappes sucrées", "Taillez régulièrement les rameaux pour aérer", 45, 3500, 2, "raisins_icone.png","raisin.jpg");
		FruitLegume poivron = new FruitLegume("Poivron", "Un poivron coloré et croquant", "Plantez-les en plein soleil et arrosez régulièrement", 35, 180, 2, "poivron_icone.png", "poivron.jpg");
		FruitLegume courgette = new FruitLegume("Courgette", "Une courgette verte et généreuse", "Arrosez au pied et évitez de mouiller les feuilles", 40, 150, 2, "courgette_icone.png", "courgette.jpg");
		FruitLegume pastèque = new FruitLegume("Pastèque", "Une pastèque bien juteuse", "Prévoyez de l’espace et beaucoup de soleil", 60, 180, 3, "pasteque_icone.png", "pasteque.jpg");
		Fleur lavande = new Fleur("Lavande", "Un parfum de Provence dans votre jardin", "Exige un sol bien drainé et peu d’eau", 60, 1500, 5, false, "lavande_icone.png", "lavande.jpg");
		Fleur marguerite = new Fleur("Marguerite", "Une touche champêtre et élégante", "Plantez en plein soleil et arrosez modérément", 30, 730, 3, false, "marguerite_icone.png", "marguerite.jpg");
		Fleur hibiscus = new Fleur("Hibiscus", "Une fleur tropicale éclatante", "Arrosez souvent et protégez du vent", 50, 1000, 2, false, "hibiscus_icone.png", "hibiscus.jpg");

		Culture cult1 = new Culture(4, LocalDate.parse("2024-12-20"), LocalDate.parse("2025-05-13"), false, jardin1, carotte);
		Culture cult2 = new Culture(24, LocalDate.parse("2025-04-10"), LocalDate.parse("2025-05-12"), false, jardin1, tulipe);
		Culture cult3 = new Culture(24, LocalDate.parse("2025-04-26"), LocalDate.parse("2025-05-15"), false, jardin2, tomate);
		Culture cult4 = new Culture(5, LocalDate.parse("2025-05-06"), LocalDate.parse("2025-05-15"), false, jardin2, fraise);
		Culture cult5 = new Culture(12, LocalDate.parse("2025-02-01"), LocalDate.parse("2025-05-13"), false, jardin1, raisin);
		Culture cult6 = new Culture(10, LocalDate.parse("2025-03-17"), LocalDate.parse("2025-05-13"), false, jardin2, pastèque);
		Culture cult7 = new Culture(7, LocalDate.parse("2024-10-01"), LocalDate.parse("2025-05-14"), false, jardin1, lavande);
		Culture cult8 = new Culture(6, LocalDate.parse("2025-04-11"), LocalDate.parse("2025-05-12"), false, jardin2, marguerite);
		Culture cult9 = new Culture(11, LocalDate.parse("2025-04-25"), LocalDate.parse("2025-05-15"), false, jardin1, courgette);
		Culture cult10 = new Culture(8, LocalDate.parse("2025-03-30"), LocalDate.parse("2025-05-13"), false, jardin2, poivron);
		Culture cult11 = new Culture(3, LocalDate.parse("2025-04-17"), LocalDate.parse("2025-05-15"), false, jardin1, oignon);
		Culture cult12 = new Culture(9, LocalDate.parse("2025-04-15"), LocalDate.parse("2025-05-11"), false, jardin2, tournesol);
		Culture cult13 = new Culture(2, LocalDate.parse("2025-05-11"), LocalDate.parse("2025-05-14"), false, jardin1, hibiscus);

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
		daoplante.save(poivron);
		daoplante.save(courgette);
		daoplante.save(pastèque);
		daoplante.save(lavande);
		daoplante.save(marguerite);
		daoplante.save(hibiscus);

		daoculture.save(cult1);
		daoculture.save(cult2);
		daoculture.save(cult3);
		daoculture.save(cult4);
		daoculture.save(cult5);
		daoculture.save(cult6);
		daoculture.save(cult7);
		daoculture.save(cult8);
		daoculture.save(cult9);
		daoculture.save(cult10);
		daoculture.save(cult11);
		daoculture.save(cult12);
		daoculture.save(cult13);

	}

}
