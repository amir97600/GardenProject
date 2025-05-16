package projet_jardin.model;


import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.OneToOne;

@Entity
@DiscriminatorValue("Client")
public class Client extends Utilisateur {

	@Column(columnDefinition = "VARCHAR(35)")
	private String nom;
	@Column(columnDefinition = "VARCHAR(35)")
	private String prenom;
	private int points = 0;
	private String avatar;
	@Column(columnDefinition = "VARCHAR(100)")
	private String email;
	
	@ElementCollection(fetch = FetchType.EAGER, targetClass = Badge.class)
	@JoinTable(name = "badges_obtenus", joinColumns = @JoinColumn(name = "Client"))
	@Column(name="Badge",nullable = false)
	@Enumerated(EnumType.STRING)
	private List<Badge> badges = new ArrayList<Badge>();
	
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

	public void setPrenom(String prenom) {
		this.prenom = prenom;
	}

	public int getPoints() {
		return points;
	}

	public void setPoints(int points) {
		this.points = points;
	}

	public List<Badge> getBadges() {
		return badges;
	}

	public void setBadges(List<Badge> badges) {
		this.badges = badges;
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

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}
	
}
