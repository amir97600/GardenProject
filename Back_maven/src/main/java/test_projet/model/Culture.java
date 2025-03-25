package test_projet.model;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name="culture")
public class Culture {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="id",nullable=false)
	private int id;
	
	
	@Column(nullable=false)
	private int quantite;
	@Column(nullable=false)
	private LocalDate datePlantation;
	@Column(nullable=false)
	private LocalDate dateDernierArrosage;
	@Column(nullable=false)
	private Boolean recolte;
	
	
	@ManyToOne
	@JoinColumn(name="jardin", nullable=false)
	private Jardin jardin;
	
	@ManyToOne
	@JoinColumn(name="plante", nullable=false)
	private Plante plante;
	
	public Culture() {}
	
	public Culture(int quantite, LocalDate datePlantation, LocalDate dateDernierArrosage, Boolean recolte,
			Jardin jardin, Plante plante) {
		this.quantite = quantite;
		this.datePlantation = datePlantation;
		this.dateDernierArrosage = dateDernierArrosage;
		this.recolte = recolte;
		this.jardin = jardin;
		this.plante = plante;
	}

	public int getQuantite() {
		return quantite;
	}

	public void setQuantite(int quantite) {
		this.quantite = quantite;
	}

	public LocalDate getDatePlantation() {
		return datePlantation;
	}

	public void setDatePlantation(LocalDate datePlantation) {
		this.datePlantation = datePlantation;
	}

	public LocalDate getDateDernierArrosage() {
		return dateDernierArrosage;
	}

	public void setDateDernierArrosage(LocalDate dateDernierArrosage) {
		this.dateDernierArrosage = dateDernierArrosage;
	}

	public Boolean getRecolte() {
		return recolte;
	}

	public void setRecolte(Boolean recolte) {
		this.recolte = recolte;
	}

	public Jardin getJardin() {
		return jardin;
	}

	public void setJardin(Jardin jardin) {
		this.jardin = jardin;
	}

	public Plante getPlante() {
		return plante;
	}

	public void setPlante(Plante plante) {
		this.plante = plante;
	}

	@Override
	public String toString() {
		return "Culture [quantite=" + quantite + ", datePlantation=" + datePlantation + ", dateDernierArrosage="
				+ dateDernierArrosage + ", recolte=" + recolte + ", jardin=" + jardin.getNumero() + ", plante=" + plante + "]";
	}
	
	
	
}
