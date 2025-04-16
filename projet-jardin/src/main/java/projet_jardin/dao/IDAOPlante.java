package projet_jardin.dao;



import org.springframework.data.jpa.repository.JpaRepository;

import projet_jardin.model.Plante;

public interface IDAOPlante extends JpaRepository<Plante, Integer> {

}
