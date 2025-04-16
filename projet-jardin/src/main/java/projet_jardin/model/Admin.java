package projet_jardin.model;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
@DiscriminatorValue("Admin")
public class Admin extends Utilisateur{
	
	public Admin() {}
	
	public Admin(String login, String password) {
		super(login, password);
	}

}
