package test_projet.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import test_projet.model.Culture;

public interface IDAOCulture extends JpaRepository<Culture, Integer> {

}
