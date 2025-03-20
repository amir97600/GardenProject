package test_projet.model;

import java.time.LocalDate;

public class Culture {
	
	private int quantite;
	private LocalDate datePlantation;
	private LocalDate dateDernierArrosage;
	private Boolean recolte;
	private Jardin jardin;
	private Plante plante;
	
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
				+ dateDernierArrosage + ", recolte=" + recolte + ", jardin=" + jardin + ", plante=" + plante + "]";
	}
	
	
	
}
