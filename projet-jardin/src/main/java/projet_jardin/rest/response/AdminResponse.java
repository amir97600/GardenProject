package projet_jardin.rest.response;

import org.springframework.beans.BeanUtils;

import projet_jardin.model.Admin;

public class AdminResponse {
	
	private int id;
	private String login;
	private String password;
	
	public AdminResponse(){}

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
	
	public static AdminResponse convert(Admin Admin) {
		AdminResponse ar = new AdminResponse();
		BeanUtils.copyProperties(Admin,ar);
		return ar;
	}
}
