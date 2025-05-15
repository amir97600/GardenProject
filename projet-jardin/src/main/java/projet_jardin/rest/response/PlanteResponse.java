package projet_jardin.rest.response;

import org.springframework.beans.BeanUtils;

import projet_jardin.model.Fleur;
import projet_jardin.model.FruitLegume;
import projet_jardin.model.Plante;

public class PlanteResponse {
			
		private Integer id;
		private String nom;
		private PlanteType planteType;
		private String description;
		private String conseil;
		private Integer delaiRecolte;
		private Integer dureeVie;
		private Integer delaiArrosage;
		private String icone;


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
		
		public String getDescription() {
			return description;
		}

		public void setDescription(String description) {
			this.description = description;
		}
		
		public String getConseil() {
			return conseil;
		}

		public void setConseil(String conseil) {
			this.conseil = conseil;
		}
		
		public PlanteType getPlanteType() {
			return planteType;
		}

		public void setPlanteType(PlanteType planteType) {
			this.planteType = planteType;
		}

		public Integer getDelaiRecolte() {
			return delaiRecolte;
		}

		public void setDelaiRecolte(Integer delaiRecolte) {
			this.delaiRecolte = delaiRecolte;
		}

		public Integer getDureeVie() {
			return dureeVie;
		}

		public void setDureeVie(Integer dureeVie) {
			this.dureeVie = dureeVie;
		}

		public Integer getDelaiArrosage() {
			return delaiArrosage;
		}

		public void setDelaiArrosage(Integer delaiArrosage) {
			this.delaiArrosage = delaiArrosage;
		}
		
		

		public String getIcone() {
			return icone;
		}

		public void setIcone(String icone) {
			this.icone = icone;
		}

		public static PlanteResponse convert(Plante plante) {
			PlanteResponse planteResponse = new PlanteResponse();
			
			BeanUtils.copyProperties(plante, planteResponse);
			planteResponse.setId(plante.getId());
			planteResponse.setNom(plante.getNom());
			planteResponse.setDescription(plante.getDescription());
			planteResponse.setConseil(plante.getConseil());
			planteResponse.setDelaiRecolte(plante.getDelaiRecolte());
			planteResponse.setDureeVie(plante.getDureeVie());
			planteResponse.setDelaiArrosage(plante.getDelaiArrosage());
			planteResponse.setIcone(plante.getIcone());

			
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

