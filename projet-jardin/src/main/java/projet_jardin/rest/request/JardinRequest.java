package projet_jardin.rest.request;

import java.util.List;

import org.springframework.beans.BeanUtils;

import projet_jardin.model.Culture;
import projet_jardin.model.Jardin;

public class JardinRequest {

	private int numero;
	private String nom;
	private String lieu;
	private double superficie;
//	private List<Culture> cultures;
	
	public JardinRequest() {
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

	public double getSuperficie() {
		return superficie;
	}

	public void setSuperficie(double superficie) {
		this.superficie = superficie;
	}

//	public List<Culture> getCultures() {
//		return cultures;
//	}
//
//	public void setCultures(List<Culture> cultures) {
//		this.cultures = cultures;
//	}
	
	public static Jardin convert(JardinRequest jardinRequest) {
		Jardin jardin = new Jardin();
		
		BeanUtils.copyProperties(jardinRequest, jardin);
		
		return jardin;
	}
	
	
}
