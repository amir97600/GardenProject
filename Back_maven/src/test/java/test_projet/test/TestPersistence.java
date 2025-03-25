package test_projet.test;

import java.time.LocalDate;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import test_projet.model.Admin;
import test_projet.model.Client;
import test_projet.model.Culture;
import test_projet.model.Fleur;
import test_projet.model.FruitLegume;
import test_projet.model.Jardin;

public class TestPersistence {

	public static void main(String[] args) {
		
		Admin admin = new Admin("admin", "admin");
		Client client1 = new Client("log1", "pass1", "alpha", "beta");
		Client client2 = new Client("log2", "pass2", "toto", "titi");
		
		Fleur fleur = new Fleur("Rose", "Une beauté piquante", 2, 14, 1, false);
		FruitLegume fl = new FruitLegume("Pomme", "Une pomme verte", 5, 21, 2);
		
		Jardin jardin1 = new Jardin(1, "Jardin d'alpha", "Paris", 14);
		Jardin jardin2 = new Jardin(2, "Jardin de toto", "Marseille", 28);
		
		Culture cult1 = new Culture(4, LocalDate.now(), LocalDate.now(), false, jardin1, fl);
		Culture cult2 = new Culture(24, LocalDate.now(), LocalDate.now(), false, jardin1, fleur);
		Culture cult3 = new Culture(24, LocalDate.now(), LocalDate.now(), false, jardin2, fl);
		Culture cult4 = new Culture(5, LocalDate.now(), LocalDate.now(), false, jardin2, fleur);
		
		try {
			
			EntityManagerFactory emf  = Persistence.createEntityManagerFactory("contextJPA");
			EntityManager em = emf.createEntityManager();
			
			
			em.getTransaction().begin();
			
			em.persist(admin);
			em.persist(client1);
			em.persist(client2);
			em.persist(fleur);
			em.persist(fl);
			em.persist(jardin1);
			em.persist(jardin2);
			em.persist(cult1);
			em.persist(cult2);
			em.persist(cult3);
			em.persist(cult4);
			
			em.getTransaction().commit();
			
			em.close();
			emf.close();
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		

	}

}
