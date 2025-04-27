package projet_jardin.rest;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.core.Authentication;

import projet_jardin.model.Utilisateur;
import projet_jardin.rest.response.ConnectedResponse;

@RestController
@RequestMapping("/api")
public class ConnectedRestController {

    @GetMapping("/me")
    public ConnectedResponse getCurrentUser(Authentication authentication) {
        Utilisateur utilisateur = (Utilisateur) authentication.getPrincipal();

        ConnectedResponse dto = new ConnectedResponse();
        dto.setId(utilisateur.getId());
    
        return dto;
    }
}

