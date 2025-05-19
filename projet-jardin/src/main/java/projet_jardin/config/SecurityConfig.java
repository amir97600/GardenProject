package projet_jardin.config;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import projet_jardin.config.jwt.JwtHeaderAuthorizationFilter;

@Configuration
@EnableMethodSecurity(prePostEnabled = true)
public class SecurityConfig {

	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http, JwtHeaderAuthorizationFilter jwtFilter) throws Exception {

		// Autorisations sur URLs
		http.authorizeHttpRequests(auth -> {
			auth.requestMatchers("/api/connexion").permitAll();
			auth.requestMatchers("/api/email/**").permitAll();
			auth.requestMatchers("/api/meteo/**").permitAll();
			auth.requestMatchers(HttpMethod.GET, "/api/utilisateur/client/**","/api/jardin/**").permitAll();
			auth.requestMatchers(HttpMethod.POST, "/api/utilisateur/client/**").permitAll();
			auth.requestMatchers(HttpMethod.PUT, "/api/utilisateur/client/**").permitAll();
			auth.requestMatchers(HttpMethod.POST, "/api/plante/**","/api/culture/**").authenticated();
			auth.requestMatchers(HttpMethod.GET, "/api/plante/**","/api/culture/**").authenticated();
			auth.requestMatchers(HttpMethod.PUT, "/api/jardin/**","/api/plante/**","/api/culture/**").authenticated();
			auth.requestMatchers(HttpMethod.DELETE, "/api/utilisateur/client", "/api/jardin/**","/api/plante/**","/api/culture/**").authenticated();
			auth.requestMatchers(HttpMethod.POST, "/api/utilisateur/delete").permitAll();
			auth.requestMatchers(HttpMethod.POST, "/api/jardin/**").permitAll();
			auth.requestMatchers("/api/jardin/nom/**").permitAll();		
			auth.requestMatchers("/api/utilisateur/admin/**").hasRole("ADMIN"); 
			auth.anyRequest().permitAll(); 
		});

		http.csrf(c -> c.ignoringRequestMatchers("/api/**"));

		// Configurer les CORS (Cross-Origine Resources Sharing)
		http.cors(c -> {
			CorsConfigurationSource source = request -> {
				CorsConfiguration config = new CorsConfiguration();

				// On autorise tout le monde
				config.setAllowedOrigins(List.of("*"));

				// On autorise toutes les commandes HTTP (GET, POST, PUT, ...)
				config.setAllowedMethods(List.of("*"));

				// On autorise toutes les en-têtes HTTP
				config.setAllowedHeaders(List.of("*"));

				return config;
			};

			c.configurationSource(source);
		});

		// Positionner le filtre JWT
		http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);


		return http.build();
	}

	// Grace à ce Bean, on pourra injecter un AuthenticationManager directement
	@Bean
	public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
		return config.getAuthenticationManager();
	}


	@Bean
	public PasswordEncoder passwordEncoder() {
		// Pas d'encadage sur les mots de passe - PAS BIEN
//		return NoOpPasswordEncoder.getInstance();

		return new BCryptPasswordEncoder();
	}

	@Bean
	public RestTemplate restTemplate() {
		return new RestTemplate();
	}
}
