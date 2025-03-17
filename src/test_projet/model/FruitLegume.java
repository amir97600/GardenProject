package test_projet.model;

public class FruitLegume extends Plante implements Recolter{

	

	public FruitLegume(String nom, String description, int delaiRecolte, int dureeVie, int delaiArrosage) {
		super(nom, description, delaiRecolte, dureeVie, delaiArrosage);
	}

	@Override
	public void recolter() {
		// TODO Auto-generated method stub
		
	}
	
	
}
