package projet_jardin.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import projet_jardin.model.Admin;
import projet_jardin.model.Client;
import projet_jardin.model.Utilisateur;

public interface IDAOUtilisateur extends JpaRepository<Utilisateur, Integer> {
	
	@Query("from Client")
	public List<Client> findAllClient();
	
	@Query("SELECT c from Client c where c.id = :id")
	public Client findClientById(@Param("id") int id);
	
	public Optional<Utilisateur> findByLogin(String login);
	
	@Query("from Admin")
	public List<Admin> findAllAdmin();
	
	@Query("SELECT a from Admin a where a.id = :id")
	public Admin findAdminByID(@Param("id") int id);
}
