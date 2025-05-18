package projet_jardin.rest.request;

import org.springframework.beans.BeanUtils;

import projet_jardin.model.Client;
import projet_jardin.model.Jardin;

public class ClientRequest {

	private int id;
	private String login;
	private String password;

	private String nom;
	private String prenom;
	private int idJardin;
	private int score;
	private String avatar;
	private String email;
	
	public ClientRequest() {}
	

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

	public int getScore() {
		return score;
	}
	public void setScore(int score) {
		this.score = score;
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
	
	public static Client convert(ClientRequest cr) {
		Client client = new Client();
		BeanUtils.copyProperties(cr,client);
	
		if(cr.getIdJardin()!=0) {
			Jardin jardin = new Jardin();
			jardin.setNumero(cr.getIdJardin());
			client.setJardin(jardin);
		}
		client.setPoints(cr.getScore());
		return client;
	}
	

}	
