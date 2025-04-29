package projet_jardin.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import projet_jardin.model.Jardin;

public interface IDAOJardin extends JpaRepository<Jardin, Integer> {
    public Optional<Jardin> findByNom(@Param("nom") String nom);
}
