package test_projet.model;

public abstract class Utilisateur {
	
<<<<<<< HEAD
	protected String login;
	protected String password;
=======
	private String login;
	private String password;
>>>>>>> ac239c6 (model and test)
	
	public Utilisateur(String login, String password) {
		this.login = login;
		this.password = password;
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
<<<<<<< HEAD

	@Override
	public String toString() {
		return "Utilisateur [login=" + login + ", password=" + password + "]";
	}
	
=======
>>>>>>> ac239c6 (model and test)
	
	
}
