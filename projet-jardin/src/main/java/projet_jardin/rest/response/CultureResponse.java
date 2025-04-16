package projet_jardin.rest.response;

import java.time.LocalDate;

import org.springframework.beans.BeanUtils;

import projet_jardin.model.Culture;

public class CultureResponse {
		
	private Integer id;
	private int quantite;
	private LocalDate datePlantation;
	private LocalDate dateDernierArrosage;
	private Boolean recolte;
	private Integer idJardin;
	private Integer idPlante;
	
	
	public CultureResponse() {}


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
	
	
	public static CultureResponse convert(Culture culture) {
		CultureResponse cultureResponse = new CultureResponse();
		BeanUtils.copyProperties(culture, cultureResponse);
		cultureResponse.setIdJardin(culture.getJardin().getNumero());
		cultureResponse.setIdPlante(culture.getPlante().getId());
		
		
		return cultureResponse; 
	}
	
	
	
}
