package projet_jardin.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import projet_jardin.model.Culture;

public interface IDAOCulture extends JpaRepository<Culture, Integer> {
	
	@Query("SELECT COALESCE(MAX(c.emplacement), 0) FROM Culture c")
	int findMaxEmplacement();


}
