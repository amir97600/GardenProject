package projet_jardin.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import projet_jardin.model.Utilisateur;

public interface IDAOUtilisateur extends JpaRepository<Utilisateur, Integer> {

}
