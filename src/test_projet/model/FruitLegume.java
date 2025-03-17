package test_projet.model;

<<<<<<< HEAD
public class FruitLegume extends Plante{
=======
public class FruitLegume extends Plante implements Recolter{
>>>>>>> ac239c6 (model and test)

	

	public FruitLegume(String nom, String description, int delaiRecolte, int dureeVie, int delaiArrosage) {
		super(nom, description, delaiRecolte, dureeVie, delaiArrosage);
	}

	@Override
<<<<<<< HEAD
	public String toString() {
		return "FruitLegume [nom=" + nom + ", description=" + description + ", datePlante=" + datePlante
				+ ", delaiRecolte=" + delaiRecolte + ", dureeVie=" + dureeVie + ", delaiArrosage=" + delaiArrosage
				+ ", cultures=" + cultures + "]";
	}
	
	
	
=======
	public void recolter() {
		// TODO Auto-generated method stub
		
	}
	
	
>>>>>>> ac239c6 (model and test)
}
