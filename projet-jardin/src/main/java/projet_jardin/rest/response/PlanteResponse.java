package projet_jardin.rest.response;

import org.springframework.beans.BeanUtils;

import projet_jardin.model.Fleur;
import projet_jardin.model.FruitLegume;
import projet_jardin.model.Plante;

public class PlanteResponse {
			
		private Integer id;
		private String nom;
		private PlanteType planteType;

		public PlanteResponse() {
			super();
		}

		public Integer getId() {
			return id;
		}

		public void setId(Integer id) {
			this.id = id;
		}

		public String getNom() {
			return nom;
		}

		public void setNom(String nom) {
			this.nom = nom;
		}
		
		
		
		public PlanteType getPlanteType() {
			return planteType;
		}

		public void setPlanteType(PlanteType planteType) {
			this.planteType = planteType;
		}

		public static PlanteResponse convert(Plante plante) {
			PlanteResponse planteResponse = new PlanteResponse();
			
			BeanUtils.copyProperties(plante, planteResponse);
			planteResponse.setId(plante.getId());
			planteResponse.setNom(plante.getNom());
			
			if(plante instanceof FruitLegume) {
				planteResponse.setPlanteType(PlanteType.FRUITLEGUME);
				FruitLegume fruitLegume = (FruitLegume) plante;
				BeanUtils.copyProperties(fruitLegume, planteResponse);

			} else if(plante instanceof Fleur) {
				planteResponse.setPlanteType(PlanteType.FLEUR);
				Fleur fleur = (Fleur) plante ;
				BeanUtils.copyProperties(fleur, planteResponse);
			}
			
			return planteResponse;
			

		}

		
		public enum PlanteType {
			FRUITLEGUME, FLEUR;
		}
		
		
}

