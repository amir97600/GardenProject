package test_projet.model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Transient;

@Entity
@DiscriminatorValue("Client")
public class Client extends Utilisateur {

	@Column(columnDefinition = "VARCHAR(35)",nullable = false)
	private String nom;
	@Column(columnDefinition = "VARCHAR(35)",nullable = false)
	private String prenom;
	private int points = 0;
	@Transient
	private List<Badge> badges = new ArrayList<Badge>();
	@OneToOne
	@JoinColumn(name="id_jardin",nullable = false)
	private Jardin jardin;
	
	public Client() {
		super();
	}
	
	
	
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

	@Override
	public String toString() {
		return "Client [nom=" + nom + ", prenom=" + prenom + ", login=" + login + ", password=" + password + ", points=" + points + ", badges=" + badges + ", jardin="
				+ jardin  + "]";
	}

	
	
	

}
