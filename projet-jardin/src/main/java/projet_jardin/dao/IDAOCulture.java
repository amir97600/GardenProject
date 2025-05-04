package projet_jardin.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import projet_jardin.model.Culture;

public interface IDAOCulture extends JpaRepository<Culture, Integer> {

}
