package test_projet.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import test_projet.model.Plante;

public interface IDAOPlante extends JpaRepository<Plante, Integer> {

}
