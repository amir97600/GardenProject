package projet_jardin.model;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
@DiscriminatorValue("fruits_legumes")
public class FruitLegume extends Plante{

	public FruitLegume() {
		// TODO Auto-generated constructor stub
	}

	public FruitLegume(String nom, String description,String conseil, int delaiRecolte, int dureeVie, int delaiArrosage, String icone, String image) {
		super(nom, description, conseil, delaiRecolte, dureeVie, delaiArrosage, icone, image);
	}

	@Override
	public String toString() {
		return "FruitLegume [nom=" + nom + ", description=" + description + ", conseil=" + conseil
				+ ", delaiRecolte=" + delaiRecolte + ", dureeVie=" + dureeVie + ", delaiArrosage=" + delaiArrosage
				+ ", cultures=" + cultures + "]";
	}
	
	
	
}
