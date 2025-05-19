package projet_jardin.model;

import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorColumn;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;

@Entity
@Table(name = "utilisateur",uniqueConstraints = @UniqueConstraint(columnNames = {"login", "email"}))
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "type_utilisateur",columnDefinition = "ENUM('Client','Admin')")
public abstract class Utilisateur {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	protected int id;
	@Column(columnDefinition = "VARCHAR(35)",nullable = false, unique = true)
	protected String login;
	@Column(columnDefinition = "VARCHAR(150)",nullable = false)
	protected String password;
	
	public Utilisateur() {}
	
	public Utilisateur(String login, String password) {
		this.login = login;
		this.password = password;
	}
	
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getLogin() {
		return login;
	}

	public void setLogin(String login) {
		this.login = login;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	@Override
	public String toString() {
		return "Utilisateur [login=" + login + ", password=" + password + "]";
	}
	
	
	
}
