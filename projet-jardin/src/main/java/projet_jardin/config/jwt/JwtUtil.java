package projet_jardin.config.jwt;

import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.Optional;

import javax.crypto.SecretKey;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.security.Keys;

public class JwtUtil {
	private static Logger log = LoggerFactory.getLogger(JwtUtil.class);

	private static final String JWT_KEY = "6E5A7234753778214125442A472D4B6150645367556B58703273357638792F42";
	private static final int JWT_EXPIRATION = 3600000;

	private JwtUtil() {
	}

	// Génération du jeton pour un utilisateur
	public static String generate(Authentication authentication) {
		SecretKey key = Keys.hmacShaKeyFor(JWT_KEY.getBytes(StandardCharsets.UTF_8));
		Date now = new Date();

		log.debug("Generating token for user {} ...", authentication.getName());

		return Jwts.builder().setSubject(authentication.getName()) // On donne dans le sujet du JWT le nom d'utilisateur
				.setIssuedAt(now) // On précise la date du jeton
				.setExpiration(new Date(now.getTime() + JWT_EXPIRATION)) // On donne la date d'expiration
				.signWith(key) // On signe le JWT
				.compact(); // On retourne au format String
	}

	// Validation du jeton - récupérer le nom d'utilisateur à partir du jeton
	public static Optional<String> getUsername(String token) {
		if (token == null || token.isBlank()) {
			return Optional.empty();
		}

		try {
			log.debug("Validating token then claim username ...");

			Claims claims = Jwts.parserBuilder().setSigningKey(JWT_KEY.getBytes(StandardCharsets.UTF_8)) // On redonne																			// validation
					.build() // On fabrique le contenu du jeton à extraire
					.parseClaimsJws(token) // On indique le jeton à parser
					.getBody(); // On récupère le "contenu" du jeton

			return Optional.ofNullable(claims.getSubject()); // On retourne le subject (le nom d'utilisateur) contenu
																// dans le jeton
		}

		catch (MalformedJwtException e) {
			log.error("Invalid JWT token: {}", e.getMessage());
		}

		catch (ExpiredJwtException e) {
			log.error("JWT token is expired: {}", e.getMessage());
		}

		catch (UnsupportedJwtException e) {
			log.error("JWT token is unsupported: {}", e.getMessage());
		}

		catch (IllegalArgumentException e) {
			log.error("JWT claims string is empty: {}", e.getMessage());
		}

		return Optional.empty();
	}
}
