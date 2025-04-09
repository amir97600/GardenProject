package test_projet.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import test_projet.model.Jardin;

public interface IDAOJardin extends JpaRepository<Jardin, Integer> {

}
