package test_projet.model;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

@Entity
@DiscriminatorValue("fruits_legumes")
public class FruitLegume extends Plante{

	public FruitLegume() {
		// TODO Auto-generated constructor stub
	}

	public FruitLegume(String nom, String description, int delaiRecolte, int dureeVie, int delaiArrosage) {
		super(nom, description, delaiRecolte, dureeVie, delaiArrosage);
	}

	@Override
	public String toString() {
		return "FruitLegume [nom=" + nom + ", description=" + description
				+ ", delaiRecolte=" + delaiRecolte + ", dureeVie=" + dureeVie + ", delaiArrosage=" + delaiArrosage
				+ ", cultures=" + cultures + "]";
	}
	
	
	
}
