package test_projet.model;

public class FruitLegume extends Plante{

	

	public FruitLegume(String nom, String description, int delaiRecolte, int dureeVie, int delaiArrosage) {
		super(nom, description, delaiRecolte, dureeVie, delaiArrosage);
	}

	@Override
	public String toString() {
		return "FruitLegume [nom=" + nom + ", description=" + description + ", datePlante=" + datePlante
				+ ", delaiRecolte=" + delaiRecolte + ", dureeVie=" + dureeVie + ", delaiArrosage=" + delaiArrosage
				+ ", cultures=" + cultures + "]";
	}
	
	
	
}
