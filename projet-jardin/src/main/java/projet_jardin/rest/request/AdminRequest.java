package projet_jardin.rest.request;

import org.springframework.beans.BeanUtils;

import projet_jardin.model.Admin;

public class AdminRequest {
	
	private int id;
	private String login;
	private String password;
	
	public AdminRequest() {}

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
	
	public static Admin convert(AdminRequest ar) {
		Admin admin = new Admin();
		BeanUtils.copyProperties(ar,admin);
		return admin;
	}
}
