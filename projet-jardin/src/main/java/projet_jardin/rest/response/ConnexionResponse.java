package projet_jardin.rest.response;

public class ConnexionResponse {
	private boolean success;
	private String token;

	public ConnexionResponse() {
		super();
	}

	public boolean isSuccess() {
		return success;
	}

	public void setSuccess(boolean success) {
		this.success = success;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

}
