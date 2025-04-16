package projet_jardin.rest.request;

import org.springframework.beans.BeanUtils;

import projet_jardin.model.Client;
import projet_jardin.model.Jardin;

public class ClientRequest {

	private int id;
	private String login;
	private String password;
	
	public ClientRequest() {}
	
	private String nom;
	private String prenom;
	private int idJardin;

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
	public int getIdJardin() {
		return idJardin;
	}
	public void setIdJardin(int idJardin) {
		this.idJardin = idJardin;
	}
	
	public static Client convert(ClientRequest cr) {
		Client client = new Client();
		BeanUtils.copyProperties(cr,client);
		if(cr.getIdJardin()!=0) {
			Jardin jardin = new Jardin();
			client.setJardin(jardin);
		}
		return client;
	}
}
