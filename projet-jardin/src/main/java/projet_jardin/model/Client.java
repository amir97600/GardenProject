package projet_jardin.model;


import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;

@Entity
@DiscriminatorValue("Client")
public class Client extends Utilisateur {

	@Column(columnDefinition = "VARCHAR(35)")
	private String nom;
	@Column(columnDefinition = "VARCHAR(35)")
	private String prenom;
	@Column(columnDefinition = "VARCHAR(35)")
	private String mail;
	private int points = 0;
	private String avatar;
	@Column(columnDefinition = "VARCHAR(100)")
	private String email;
	
	@OneToOne(cascade = CascadeType.REMOVE, orphanRemoval = true)
	@JoinColumn(name="id_jardin")
	private Jardin jardin;

	


	public Client() {}
	
	
	
	public Client(String login, String password, String nom,String prenom) {
		super(login, password);
		this.nom = nom;
		this.prenom = prenom;
	}

	public String getNom() {
		return nom;
	}

	public void setNom(String nom) {
		this.nom = nom;
	}

	public String getPrenom() {
		return prenom;
	}

	public String getMail() {
		return mail;
	}

	public void setMail(String mail) {
		this.mail = mail;
	}

	public void setPrenom(String prenom) {
		this.prenom = prenom;
	}

	public int getPoints() {
		return points;
	}

	public void setPoints(int points) {
		this.points = points;
	}

	public Jardin getJardin() {
		return jardin;
	}

	public void setJardin(Jardin jardin) {
		this.jardin = jardin;
	}
		
	public String getAvatar() {
		return avatar;
	}

	public void setAvatar(String avatar) {
		this.avatar = avatar;
	}

}
