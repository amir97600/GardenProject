package test_projet.model;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

@Entity
@DiscriminatorValue("Admin")
public class Admin extends Utilisateur{
	
	public Admin() {
		super();
	}
	
	public Admin(String login, String password) {
		super(login, password);
	}

}
