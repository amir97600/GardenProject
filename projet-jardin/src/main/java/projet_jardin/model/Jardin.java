package projet_jardin.model;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.CascadeType;
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
	private int numero;
	
	@Column(name="nom", nullable=false)
	private String nom;
	
	@Column(name="lieu", nullable=false)
	private String lieu;

	
	@OneToMany(mappedBy = "jardin", cascade = CascadeType.REMOVE, orphanRemoval = true)
	private List<Culture> cultures = new ArrayList<Culture>();

	public Jardin() {}
	
	public Jardin(String nom, String lieu) {
		this.nom = nom;
		this.lieu = lieu;
	}
	
	public Jardin(int numero, String nom, String lieu) {
		this.numero = numero;
		this.nom = nom;
		this.lieu = lieu;
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



	@JsonProperty("lieu")
	public String getLieu() {
		return lieu;
	}




	public void setLieu(String lieu) {
		this.lieu = lieu;
	}

	public List<Culture> getCultures() {
		return cultures;
	}



	public void setCultures(List<Culture> cultures) {
		this.cultures = cultures;
	}



	@Override
	public String toString() {
		return "Jardin [numero=" + numero + ", nom=" + nom + ", lieu=" + lieu + "]";
	}

	
	
	
}
