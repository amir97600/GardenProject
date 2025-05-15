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
	
	@Query("SELECT c from Client c where c.login = :login")
	public Client findClientByLogin(@Param("login") String login);

	public Optional<Utilisateur> findByLogin(String login);

	@Query("SELECT c from Client c where c.jardin.id = :idJardin")
	public Client findClientByIdJardin(@Param("idJardin") Integer idJardin);
	
	@Query("from Admin")
	public List<Admin> findAllAdmin();
	
	@Query("SELECT a from Admin a where a.id = :id")
	public Admin findAdminByID(@Param("id") int id);

	@Query("SELECT a from Admin a where a.login = :login")
	public Admin findAdminByLogin(@Param("login") String login);
}
