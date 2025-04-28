package projet_jardin.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import jakarta.transaction.Transactional;

@Service
public class DatabaseService {

    @Autowired
    private EntityManager entityManager;

    @Transactional
    public List<String> getAllTables() {

        String sql = "SHOW TABLES";

        Query query = entityManager.createNativeQuery(sql);
        return (ArrayList<String>) query.getResultList();
    }
}
