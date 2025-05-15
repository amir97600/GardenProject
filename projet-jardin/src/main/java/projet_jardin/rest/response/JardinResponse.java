package projet_jardin.rest.response;

import java.util.List;

import org.springframework.beans.BeanUtils;

import projet_jardin.model.Culture;
import projet_jardin.model.Jardin;

public class JardinResponse {

	private int numero;
	private String nom;
	private String lieu;
	private List<CultureResponse> cultures;
	
	public JardinResponse() {
		super();
	}

	public int getNumero() {
		return numero;
	}

	public void setNumero(int numero) {
		this.numero = numero;
	}

	public String getNom() {
		return nom;
	}

	public void setNom(String nom) {
		this.nom = nom;
	}

	public String getLieu() {
		return lieu;
	}

	public void setLieu(String lieu) {
		this.lieu = lieu;
	}

	public List<CultureResponse> getCultures() {
		return cultures;
	}

	public void setCultures(List<CultureResponse> cultures) {
		this.cultures = cultures;
	}
	
	public static JardinResponse convert (Jardin jardin) {
		JardinResponse jardinResponse = new JardinResponse();
		List<Culture> listCultures = jardin.getCultures();
		List<CultureResponse> culturesResp = listCultures.stream().map(CultureResponse::convert).toList();
		BeanUtils.copyProperties(jardin, jardinResponse);
		jardinResponse.setCultures(culturesResp);
		
		return jardinResponse;
	}
	
}
