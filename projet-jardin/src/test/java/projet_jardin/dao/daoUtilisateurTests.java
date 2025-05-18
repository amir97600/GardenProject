package projet_jardin.dao;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;

import jakarta.transaction.Transactional;
import projet_jardin.model.Admin;
import projet_jardin.model.Client;
import projet_jardin.model.Utilisateur;

@SpringBootTest
@Transactional 
public class daoUtilisateurTests {
	
	@Autowired
	private IDAOUtilisateur daoUtilisateur;
	
	@Test
	@Rollback
	public void getAllUtilisateursDAO() {
		Admin user = new Admin("a","b");
		daoUtilisateur.save(user);
		List<Utilisateur> utilisateurs = daoUtilisateur.findAll();

		assertNotNull(utilisateurs);
		assertTrue(utilisateurs.size() > 0);
		assertEquals(utilisateurs.get(0).getClass().getSimpleName(), "Admin");

		System.out.println("Test DAO getAllUtilisateurs ok");
	}

	@Test
	@Rollback
	public void getUtilisateurByIdDAO() {
		Client utilisateur = new Client();
		utilisateur.setNom("loger");
		utilisateur.setPrenom("loger");
		utilisateur.setLogin("loger");
		utilisateur.setPassword("loger");
		utilisateur = daoUtilisateur.save(utilisateur);
		Integer id = utilisateur.getId();

		utilisateur = (Client)daoUtilisateur.findById(id).get();

		assertNotNull(utilisateur);
		assertEquals("loger", utilisateur.getLogin());
		assertEquals(utilisateur.getClass().getSimpleName(), "Client");

		System.out.println("Test DAO getUtilisateurById ok");
	}

	@Test
	@Rollback
	public void createUtilisateurDAO() {
		Client utilisateur = new Client();
		utilisateur.setLogin("daoUser");
		utilisateur.setPassword("daoPass");
		utilisateur.setNom("daoNom");

		Client saved = daoUtilisateur.save(utilisateur);

		assertNotNull(saved);
		assertNotNull(saved.getId());
		assertEquals("daoUser", saved.getLogin());
		assertEquals(saved.getClass().getSimpleName(), "Client");

		System.out.println("Test DAO createUtilisateur ok");
	}

	@Test
	@Rollback
	public void updateUtilisateurDAO() {
		Client utilisateur = new Client();
		utilisateur.setNom("a");
		utilisateur.setPrenom("a");
		utilisateur.setLogin("a");
		utilisateur.setPassword("a");
		daoUtilisateur.save(utilisateur);
		utilisateur = (Client) daoUtilisateur.findByLogin("a").orElseThrow();

		utilisateur.setNom("nomModifie");

		Client updated = daoUtilisateur.save(utilisateur);

		assertEquals("nomModifie", updated.getNom());

		System.out.println("Test DAO updateUtilisateur ok");
	}

	@Test
	@Rollback
	public void deleteUtilisateurDAO() {
		Client utilisateur = new Client();
		utilisateur.setLogin("todelete");
		utilisateur.setPassword("todelete");
		utilisateur.setNom("todelete");

		Client saved = daoUtilisateur.save(utilisateur);

		Integer id = saved.getId();
		daoUtilisateur.deleteById(id);

		assertFalse(daoUtilisateur.existsById(id));

		System.out.println("Test DAO deleteUtilisateur ok");
	}

}
