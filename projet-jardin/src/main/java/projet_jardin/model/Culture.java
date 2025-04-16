package projet_jardin.model;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="culture")
public class Culture {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="id",nullable=false)
	private int id;
	
	
	@Column(nullable=false)
	private int quantite;
	@Column(name="date_plantation",nullable=false)
	private LocalDate datePlantation;
	@Column(name="date_dernier_arrosage",nullable=false)
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
