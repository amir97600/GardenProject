package projet_jardin.rest;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import projet_jardin.config.jwt.JwtUtil;
import projet_jardin.dao.IDAOUtilisateur;
import projet_jardin.rest.request.ConnexionRequest;
import projet_jardin.rest.response.ConnexionResponse;

@RestController
@RequestMapping("/api")
public class CommonRestController {
	
	@Autowired
	private AuthenticationManager authenticationManager;

	private final RestTemplate restTemplate = new RestTemplate();

	public CommonRestController() {
		super();
	}

	@PostMapping("/connexion")
	public ConnexionResponse create(@RequestBody ConnexionRequest connexionRequest) throws Exception {
		// On va demander à SPRING SECURITY de vérifier le username / password
		// On a besoin d'un AuthenticationManager
		// On utilisera la méthode authenticate, qui attend un Authentication
		// Et on utilisera le type UsernamePasswordAuthenticationToken pour donner le
		// username & le password
		

		Authentication authentication = new UsernamePasswordAuthenticationToken(connexionRequest.getLogin(),
			connexionRequest.getPassword());

		

		// On demande à SPRING SECURITY de vérifier ces informations de connexion
		Authentication auth = this.authenticationManager.authenticate(authentication);

		
		// Si on arrive ici, c'est que la connexion a fonctionné
		ConnexionResponse connexionResponse = new ConnexionResponse();

		// On génère un jeton pour l'utilisateur connecté
		String token = JwtUtil.generate(authentication);

		// On récupère les autorités de l'utilisateur authentifié
		Collection<? extends GrantedAuthority> authorities = auth.getAuthorities();

		String role = authorities.stream().map(authority -> authority.getAuthority()).findFirst().orElse("User");
		
		
		connexionResponse.setSuccess(true);
		connexionResponse.setToken(token);
		connexionResponse.setRole(role);

		return connexionResponse;
	}


    @GetMapping("/ville/{codePostal}")
    public ResponseEntity<?> getVilleParCodePostal(@PathVariable String codePostal) {
        
		String apiUrl = "https://api.zippopotam.us/fr/" + codePostal;

        try {
            ResponseEntity<String> response = restTemplate.getForEntity(apiUrl, String.class);
            return ResponseEntity.ok(response.getBody());
        } catch (Exception e) {
            return ResponseEntity.status(404).body("Ville introuvable ou erreur de l'API");
        }
    }
    
}
