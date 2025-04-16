package projet_jardin.rest.request;

import java.time.LocalDate;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import projet_jardin.dao.IDAOJardin;
import projet_jardin.dao.IDAOPlante;
import projet_jardin.model.Culture;


public class CultureRequest {
	

	private static IDAOJardin daoJardin;
	private static IDAOPlante daoPlante;
	
	private Integer id;
	private int quantite;
	private LocalDate datePlantation;
	private LocalDate dateDernierArrosage;
	private Boolean recolte;
	private Integer idJardin;
	private Integer idPlante;
	
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
	
	public static Culture convert(CultureRequest cultureRequest) {
		Culture culture = new Culture();
		
		BeanUtils.copyProperties(cultureRequest, culture);
		culture.setJardin(daoJardin.findById(cultureRequest.getIdJardin()).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND)));
		culture.setPlante(daoPlante.findById(cultureRequest.getIdPlante()).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND)));
		
		return culture;
	}

}
