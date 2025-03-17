package test_projet.model;

public class Fleur extends Plante {
	
	private boolean comestibilite;

	public Fleur(String nom, String description, int delaiRecolte, int dureeVie, int delaiArrosage, boolean comestibilite) {
		super(nom, description, delaiRecolte, dureeVie, delaiArrosage);
		this.comestibilite = comestibilite;
	}

	@Override
	public String toString() {
		return "Fleur [comestibilite=" + comestibilite + "]";
	}
	
	
}
