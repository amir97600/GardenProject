package projet_jardin.model;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonView;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name="jardin")
public class Jardin {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="numero",nullable=false)
	@JsonView(Views.ViewBasic.class)
	private int numero;
	
	@Column(name="nom", nullable=false)
	@JsonView(Views.ViewBasic.class)
	private String nom;
	
	@Column(name="lieu", nullable=false)
	@JsonView(Views.ViewBasic.class)
	private String lieu;
	
	@Column(name="superficie", nullable=false, columnDefinition = "DECIMAL(8,2)")
	@JsonView(Views.ViewBasic.class)
	private double superficie;
	
	@OneToMany(mappedBy = "jardin")
	private List<Culture> cultures = new ArrayList<Culture>();

	public Jardin() {}
	
	public Jardin(String nom, String lieu, double superficie) {
		this.nom = nom;
		this.lieu = lieu;
		this.superficie = superficie;
	}
	
	public Jardin(int numero, String nom, String lieu, double superficie) {
		this.numero = numero;
		this.nom = nom;
		this.lieu = lieu;
		this.superficie = superficie;
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



	public List<Culture> getCultures() {
		return cultures;
	}



	public void setCultures(List<Culture> cultures) {
		this.cultures = cultures;
	}



	@Override
	public String toString() {
		return "Jardin [numero=" + numero + ", nom=" + nom + ", lieu=" + lieu + ", superficie=" + superficie
				+ ", cultures=" + cultures + "]";
	}

	
	
	
}
