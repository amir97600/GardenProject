package test_projet.model;

public class Fleur extends Plante {
	
	private boolean comestibilite;

	public Fleur(String nom, String description, int delaiRecolte, int dureeVie, int delaiArrosage, boolean comestibilite) {
		super(nom, description, delaiRecolte, dureeVie, delaiArrosage);
		this.comestibilite = comestibilite;
	}
	
	
<<<<<<< HEAD

	public boolean isComestibilite() {
		return comestibilite;
	}



	public void setComestibilite(boolean comestibilite) {
		this.comestibilite = comestibilite;
	}



	@Override
	public String toString() {
		return "Fleur [comestibilite=" + comestibilite + ", nom=" + nom + ", description=" + description
				+ ", datePlante=" + datePlante + ", delaiFloraison=" + delaiRecolte + ", dureeVie=" + dureeVie
				+ ", delaiArrosage=" + delaiArrosage + ", cultures=" + cultures + "]";
	}



=======
	
	
>>>>>>> ac239c6 (model and test)
	
	
	
}
