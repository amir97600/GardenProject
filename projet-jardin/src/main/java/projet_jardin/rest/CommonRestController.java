package projet_jardin.rest;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import projet_jardin.config.jwt.JwtUtil;
import projet_jardin.rest.request.ConnexionRequest;
import projet_jardin.rest.response.ConnexionResponse;

@RestController
@RequestMapping("/api")
public class CommonRestController {
	
	@Autowired
	private AuthenticationManager authenticationManager;
	

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

    
}
