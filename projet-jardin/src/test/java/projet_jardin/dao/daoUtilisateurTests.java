package projet_jardin.dao;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import projet_jardin.model.Client;
import projet_jardin.model.Utilisateur;

@SpringBootTest
public class daoUtilisateurTests {
	
	@Autowired
	private IDAOUtilisateur daoUtilisateur;
	
	@Test
	public void getAllUtilisateursDAO() {
		List<Utilisateur> utilisateurs = daoUtilisateur.findAll();

		assertNotNull(utilisateurs);
		assertTrue(utilisateurs.size() > 0);
		assertEquals(utilisateurs.get(0).getClass().getSimpleName(), "Admin");

		System.out.println("Test DAO getAllUtilisateurs ok");
	}

	@Test
	public void getUtilisateurByIdDAO() {
		Integer id = 2;

		Utilisateur utilisateur = daoUtilisateur.findById(id).orElseThrow();

		assertNotNull(utilisateur);
		assertEquals("log1", utilisateur.getLogin());
		assertEquals(utilisateur.getClass().getSimpleName(), "Client");

		System.out.println("Test DAO getUtilisateurById ok");
	}

	@Test
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
	public void updateUtilisateurDAO() {
		Integer id = 2;
		Client utilisateur = (Client) daoUtilisateur.findById(id).orElseThrow();

		utilisateur.setNom("nomModifie");

		Client updated = daoUtilisateur.save(utilisateur);

		assertEquals("nomModifie", updated.getNom());

		System.out.println("Test DAO updateUtilisateur ok");
	}

	@Test
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
