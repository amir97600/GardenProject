package projet_jardin.model;

import com.fasterxml.jackson.annotation.JsonView;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;


@Entity
@DiscriminatorValue("fleurs")
public class Fleur extends Plante {
	
	@JsonView(Views.ViewBasic.class)
	private boolean comestibilite = false;
	
	public Fleur() {
		// TODO Auto-generated constructor stub
	}
	
	public Fleur(String nom, String description, String conseil, int delaiRecolte, int dureeVie, int delaiArrosage, boolean comestibilite, String icone) {
		super(nom, description, conseil, delaiRecolte, dureeVie, delaiArrosage, icone);
		this.comestibilite = comestibilite;
	}
	
	

	public boolean isComestibilite() {
		return comestibilite;
	}



	public void setComestibilite(boolean comestibilite) {
		this.comestibilite = comestibilite;
	}



	@Override
	public String toString() {
		return "Fleur [comestibilite=" + comestibilite + ", nom=" + nom + ", description=" + description + ", conseil=" + conseil
				+ ", delaiFloraison=" + delaiRecolte + ", dureeVie=" + dureeVie
				+ ", delaiArrosage=" + delaiArrosage + ", cultures=" + cultures + "]";
	}



	
	
	
}
