package test_projet.context;

import java.util.ArrayList;
import java.util.List;

import test_projet.model.Admin;
import test_projet.model.Client;
import test_projet.model.Fleur;
import test_projet.model.FruitLegume;
import test_projet.model.Utilisateur;

public class Context {

	private static Context _instance;
	private  List<Utilisateur> users = new ArrayList<Utilisateur>();
	private  int connecte = 0;
	private  Client user = null;
	private  Admin admin = null;
	private  int numeroJardin=0;
	private  List<Fleur> fleurs = new ArrayList();
	private  List<FruitLegume> agricoles = new ArrayList();
	
	private Context() {}

	public static Context getInstance() {
		if(_instance == null) {
			_instance = new Context();
		}
		return _instance;
	}

	public List<Utilisateur> getUsers() {
		return users;
	}

	public  void setUsers(List<Utilisateur> users) {
		this.users = users;
	}

	public  int getConnecte() {
		return connecte;
	}

	public void setConnecte(int connecte) {
		this.connecte = connecte;
	}

	public Client getUser() {
		return user;
	}

	public void setUser(Client user) {
		this.user = user;
	}

	public  Admin getAdmin() {
		return admin;
	}

	public void setAdmin(Admin admin) {
		this.admin = admin;
	}

	public int getNumeroJardin() {
		return numeroJardin;
	}

	public void setNumeroJardin(int numeroJardin) {
		this.numeroJardin = numeroJardin;
	}

	public List<Fleur> getFleurs() {
		return fleurs;
	}

	public void setFleurs(List<Fleur> fleurs) {
		this.fleurs = fleurs;
	}

	public List<FruitLegume> getAgricoles() {
		return agricoles;
	}

	public void setAgricoles(List<FruitLegume> agricoles) {
		this.agricoles = agricoles;
	}
	
	
	
	
	
}
