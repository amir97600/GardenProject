package projet_jardin.config.jwt;


import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import projet_jardin.dao.IDAOUtilisateur;
import projet_jardin.model.Admin;
import projet_jardin.model.Utilisateur;


@Component
public class JwtHeaderAuthorizationFilter extends OncePerRequestFilter {
	@Autowired
	private IDAOUtilisateur daoUtilisateur;

	@Override
protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
        throws ServletException, IOException {

    String authHeader = request.getHeader("Authorization");
    String token = null;

    if (authHeader != null && authHeader.startsWith("Bearer ") ) {
		if(authHeader.length() > 7){
			token = authHeader.substring(7); // On retire "Bearer "
		}
        
    }

    if (token != null && !token.isBlank()) {
        Optional<String> optUsername = JwtUtil.getUsername(token);

        if (optUsername.isPresent()) {
            String username = optUsername.get();
            Optional<Utilisateur> optUtilisateur = this.daoUtilisateur.findByLogin(username);

            if (optUtilisateur.isPresent()) {
                Utilisateur utilisateur = optUtilisateur.get();

                List<GrantedAuthority> authorities = new ArrayList<>();
                if (utilisateur instanceof Admin) {
                    authorities.add(new SimpleGrantedAuthority("ROLE_ADMIN"));
                } else {
                    authorities.add(new SimpleGrantedAuthority("ROLE_CLIENT"));
                }

                Authentication authentication = new UsernamePasswordAuthenticationToken(username, null, authorities);
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        }
    }

    filterChain.doFilter(request, response);
}

}
