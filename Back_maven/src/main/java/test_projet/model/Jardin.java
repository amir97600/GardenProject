package test_projet.model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name="jardin")
public class Jardin {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="numero",nullable=false)
	private int numero;
	
	@Column(name="nom", nullable=false)
	private String nom;
	
	@Column(name="lieu", nullable=false)
	private String lieu;
	
	@Column(name="superficie", nullable=false, columnDefinition = "DECIMAL(8,2)")
	private double superficie;
	
	@OneToMany(mappedBy = "jardin")
	private List<Culture> cultures = new ArrayList<Culture>();

	public Jardin() {}
	
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
