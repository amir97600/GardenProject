package projet_jardin.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import projet_jardin.dao.IDAOUtilisateur;
import projet_jardin.model.Client;

@Service
public class ScoreService {

    @Autowired
    private IDAOUtilisateur daoUtilisateur;

    public void ajouterPoints(Integer clientId, int points) {
        Client client = daoUtilisateur.findClientById(clientId);

        int nouveauScore = client.getPoints() + points;
        client.setPoints(nouveauScore);
        daoUtilisateur.save(client);
    }

}
