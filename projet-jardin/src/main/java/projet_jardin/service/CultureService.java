package projet_jardin.service;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import projet_jardin.dao.IDAOCulture;
import projet_jardin.dao.IDAOUtilisateur;
import projet_jardin.model.Client;
import projet_jardin.model.Culture;

@Service
public class CultureService {
    @Autowired
    private IDAOCulture daoCulture;
    @Autowired
    private IDAOUtilisateur daoUtilisateur;
    @Autowired
    private ScoreService scoreService;

    public Culture arroserCulture(Integer cultureId) {
        Culture culture = daoCulture.findById(cultureId)
                .orElseThrow(() -> new RuntimeException("Culture non trouvée"));

        Client client = daoUtilisateur.findClientByIdJardin(culture.getJardin().getNumero());

        LocalDate aujourdHui = LocalDate.now();

        culture.setDateDernierArrosage(aujourdHui);
    
        scoreService.ajouterPoints(client.getId(), 2);

        return culture;
    }


    public void ajouterCulture(Culture culture, Integer clientId) {
        scoreService.ajouterPoints(clientId, 4);
    }

    public Culture recolterCulture(Integer cultureId) {
        Culture culture = daoCulture.findById(cultureId)
                .orElseThrow(() -> new RuntimeException("Culture non trouvée"));

        Client client = daoUtilisateur.findClientByIdJardin(culture.getJardin().getNumero());

        culture.setRecolte(true);
    
        scoreService.ajouterPoints(client.getId(), 20);

        return culture;
    }
}

   
