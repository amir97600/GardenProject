package test_projet.model;

import java.util.ArrayList;
import java.util.List;

public class Client extends Utilisateur {

	private String nom;
	private String prenom;
	private int points = 0;
	private List<Badge> badges = new ArrayList<Badge>();
	private Jardin jardin;
	
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
