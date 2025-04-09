package test_projet.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import test_projet.model.Utilisateur;

public interface IDAOUtilisateur extends JpaRepository<Utilisateur, Integer> {

}
