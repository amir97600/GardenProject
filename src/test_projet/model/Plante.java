package test_projet.model;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public abstract class Plante {
	
	protected String nom;
	protected String description;
	protected LocalDate datePlante;
	protected int delaiRecolte; //Un intervalle de recolte en semaines
	protected int dureeVie; //Duree de la vie de la plante en semaine
	protected int delaiArrosage; //Combien de temps avant le prochain arrosage
	protected List<Culture> cultures = new ArrayList<Culture>();
	
	public Plante(String nom, String description, int delaiRecolte, int dureeVie, int delaiArrosage) {
		this.nom = nom;
		this.description = description;
		this.delaiRecolte = delaiRecolte;
		this.dureeVie = dureeVie;
		this.delaiArrosage = delaiArrosage;
		this.datePlante = LocalDate.now();
	}

	public String getNom() {
		return nom;
	}

	public void setNom(String nom) {
		this.nom = nom;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public int getDelaiRecolte() {
		return delaiRecolte;
	}

	public void setDelaiRecolte(int delaiRecolte) {
		this.delaiRecolte = delaiRecolte;
	}

	public int getDureeVie() {
		return dureeVie;
	}

	public void setDureeVie(int dureeVie) {
		this.dureeVie = dureeVie;
	}

	public int getDelaiArrosage() {
		return delaiArrosage;
	}

	public void setDelaiArrosage(int delaiArrosage) {
		this.delaiArrosage = delaiArrosage;
	}

	public List<Culture> getCultures() {
		return cultures;
	}

	public void setCultures(List<Culture> cultures) {
		this.cultures = cultures;
	}

	@Override
	public String toString() {
		return "Plante [nom=" + nom + ", description=" + description + ", datePlante=" + datePlante + ", delaiRecolte="
				+ delaiRecolte + ", dureeVie=" + dureeVie + ", delaiArrosage=" + delaiArrosage + ", cultures="
				+ cultures + "]";
	}

	
	

	
	
}
