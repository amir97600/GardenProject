package projet_jardin.model;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonView;

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
	@JsonView(Views.ViewBasic.class)
	private Integer id;
	
	
	@Column(nullable=false)
	@JsonView(Views.ViewBasic.class)
	private Integer quantite;
	@Column(name="date_plantation",nullable=false)
	@JsonView(Views.ViewBasic.class)
	private LocalDate datePlantation;
	@Column(name="date_dernier_arrosage",nullable=false)
	@JsonView(Views.ViewBasic.class)
	private LocalDate dateDernierArrosage;
	@Column(nullable=false)
	@JsonView(Views.ViewBasic.class)
	private Boolean recolte;
	@Column(name = "emplacement", nullable = false)
	@JsonView(Views.ViewBasic.class)
	private Integer emplacement;
	
	
	@ManyToOne
	@JoinColumn(name="jardin", nullable=false)
	@JsonView(Views.ViewCulture.class)
	private Jardin jardin;
	
	@ManyToOne
	@JoinColumn(name="plante", nullable=false)
	@JsonView(Views.ViewCulture.class)
	private Plante plante;
	
	public Culture() {}
	
	public Culture(int quantite, LocalDate datePlantation, LocalDate dateDernierArrosage, Boolean recolte,
			Jardin jardin, Plante plante, Integer emplacement) {
		this.quantite = quantite;
		this.datePlantation = datePlantation;
		this.dateDernierArrosage = dateDernierArrosage;
		this.recolte = recolte;
		this.jardin = jardin;
		this.plante = plante;
		this.emplacement = emplacement;
	}

	

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public void setQuantite(Integer quantite) {
		this.quantite = quantite;
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
	
	public Integer getEmplacement() {
		return emplacement;
	}

	public void setEmplacement(Integer emplacement) {
		this.emplacement = emplacement;
	}


	@Override
	public String toString() {
		return "Culture [id=" + id + ", quantite=" + quantite + ", datePlantation=" + datePlantation
				+ ", dateDernierArrosage=" + dateDernierArrosage + ", recolte=" + recolte + ", emplacement="
				+ emplacement + ", jardin=" + jardin + ", plante=" + plante + "]";
	}
	
	
	
	
}
