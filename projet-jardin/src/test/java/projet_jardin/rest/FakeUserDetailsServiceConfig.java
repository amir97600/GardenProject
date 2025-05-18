package projet_jardin.rest;


import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Primary;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;

@TestConfiguration
@Primary
public class FakeUserDetailsServiceConfig {

    @Bean
    public UserDetailsService userDetailsService(PasswordEncoder passwordEncoder) {
        UserDetails fakeAdmin = User.withUsername("admin")
            .password(passwordEncoder.encode("admin")) // encodage
            .roles("ADMIN")
            .build();
        return new InMemoryUserDetailsManager(fakeAdmin);
    }

}