package projet_jardin.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import projet_jardin.dao.IDAOUtilisateur;
import projet_jardin.model.Admin;
import projet_jardin.model.Utilisateur;

@Service
public class JpaUserDetailsService implements UserDetailsService {
	
	@Autowired
	private IDAOUtilisateur daoUtilisateur;
	
	@Autowired
	private PasswordEncoder passwordEncoder;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Utilisateur utilisateur = this.daoUtilisateur.findByLogin(username).orElseThrow(() -> new UsernameNotFoundException("L'utilisateur n'existe pas."));
		
		// Si l'utilisateur n'a pas été trouvé, l'exception sera jetée, et on s'arrêtera là

		User.UserBuilder userBuilder = User.withUsername(username).password(utilisateur.getPassword());
		
		if(utilisateur instanceof Admin) {
			userBuilder.roles("ADMIN");
		} else {
			userBuilder.roles("CLIENT");
		}

		return userBuilder.build();

	}

}
