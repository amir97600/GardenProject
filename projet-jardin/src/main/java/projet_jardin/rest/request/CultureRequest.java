package projet_jardin.rest.request;

import java.time.LocalDate;

import org.springframework.beans.BeanUtils;

import projet_jardin.model.Culture;
import projet_jardin.model.Fleur;
import projet_jardin.model.FruitLegume;
import projet_jardin.model.Jardin;
import projet_jardin.model.Plante;


public class CultureRequest {
	
	private Integer id;
	private int quantite;
	private LocalDate datePlantation;
	private LocalDate dateDernierArrosage;
	private Boolean recolte;
	private Integer idJardin;
	private Integer idPlante;
	private PlanteType planteType;
	
	public CultureRequest () {}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public int getQuantite() {
		return quantite;
	}

	public void setQuantite(int quantite) {
		this.quantite = quantite;
	}

	public LocalDate getDatePlantation() {
		return datePlantation;
	}

	public void setDatePlantation(LocalDate datePlantation) {
		this.datePlantation = datePlantation;
	}

	public LocalDate getDateDernierArrosage() {
		return dateDernierArrosage;
	}

	public void setDateDernierArrosage(LocalDate dateDernierArrosage) {
		this.dateDernierArrosage = dateDernierArrosage;
	}

	public Boolean getRecolte() {
		return recolte;
	}

	public void setRecolte(Boolean recolte) {
		this.recolte = recolte;
	}

	public Integer getIdJardin() {
		return idJardin;
	}

	public void setIdJardin(Integer idJardin) {
		this.idJardin = idJardin;
	}

	public Integer getIdPlante() {
		return idPlante;
	}

	public void setIdPlante(Integer idPlante) {
		this.idPlante = idPlante;
	}
	
	
	public PlanteType getPlanteType() {
		return planteType;
	}

	public void setPlanteType(PlanteType planteType) {
		this.planteType = planteType;
	}

	public static Culture convert(CultureRequest cultureRequest) {
		Culture culture = new Culture();
		
		BeanUtils.copyProperties(cultureRequest, culture);
		
		Jardin jardin= new Jardin();
		jardin.setNumero(cultureRequest.getIdJardin());
		
		Plante plante = null;
		if(cultureRequest.getPlanteType() == PlanteType.Fleur) {
			plante = new Fleur();
		} else if(cultureRequest.getPlanteType() == PlanteType.FruitLegume) {
			plante = new FruitLegume();
		} 
		plante.setId(cultureRequest.getIdPlante());
		culture.setJardin(jardin);
		culture.setPlante(plante);
		
		return culture;
	}
	
	public enum PlanteType {
		FruitLegume, Fleur;
	}

}
