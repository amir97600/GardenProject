package test_projet.context;

import java.util.ArrayList;
import java.util.List;

import test_projet.model.Utilisateur;

public class Context {

	private static Context _instance;
	private List<Utilisateur> users = new ArrayList<Utilisateur>();
	
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

	public void setUsers(List<Utilisateur> users) {
		this.users = users;
	}
	
	
	
}
