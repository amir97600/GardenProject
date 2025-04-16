package projet_jardin.dao;



import org.springframework.data.jpa.repository.JpaRepository;

import projet_jardin.model.Jardin;

public interface IDAOJardin extends JpaRepository<Jardin, Integer> {

}
