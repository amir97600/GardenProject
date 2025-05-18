package projet_jardin.rest.request;

import org.springframework.beans.BeanUtils;

import projet_jardin.model.Fleur;
import projet_jardin.model.FruitLegume;
import projet_jardin.model.Plante;

public class PlanteRequest {
	
	private Integer id;
	private String nom;
	private String Description;
	private String conseil;
	private int delaiRecolte;
	private int dureeVie;
	private int delaiArrosage;
	private String image;
	private String icone;
	private PlanteType planteType;

	
	public PlanteRequest() {
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


	public String getDescription() {
		return Description;
	}


	public void setDescription(String description) {
		this.Description = description;
	}

	public String getConseil() {
		return conseil;
	}


	public void setConseil(String conseil) {
		this.conseil = conseil;
	}

	public int getDelaiRecolte() {
		return delaiRecolte;
	}


	public void setDelaiRecolte(int delairecolte) {
		this.delaiRecolte = delairecolte;
	}


	public int getDureeVie() {
		return dureeVie;
	}


	public void setDureeVie(int dureeVie) {
		this.dureeVie = dureeVie;
	}


	public int getDelaiArrosage() {
		return delaiArrosage;
	}


	public void setDelaiArrosage(int delaiArrosage) {
		this.delaiArrosage = delaiArrosage;
	}
	
	
	
	public String getImage() {
		return image;
	}


	public void setImage(String image) {
		this.image = image;
	}

	public String getIcone() {
		return icone;
	}


	public void setIcone(String icone) {
		this.icone = icone;
	}

	


	public static Plante convert(PlanteRequest planteRequest) {
		Plante plante = null;
		if(planteRequest.getPlanteType() == PlanteType.FRUITLEGUME) {
			plante = new FruitLegume();
		} else
			plante = new Fleur();
		
		BeanUtils.copyProperties(planteRequest, plante);
		plante.setId(planteRequest.getId());
		plante.setNom(planteRequest.getNom());
		plante.setDescription(planteRequest.getDescription());
		plante.setConseil(planteRequest.getConseil());
		plante.setDelaiRecolte(planteRequest.getDelaiRecolte());
		plante.setDureeVie(planteRequest.getDureeVie());
		plante.setDelaiArrosage(planteRequest.getDelaiArrosage());
		plante.setImage(planteRequest.getImage());
		
		return plante;
		
	}
	
	public enum PlanteType {
		FRUITLEGUME, FLEUR;
	}


}

	