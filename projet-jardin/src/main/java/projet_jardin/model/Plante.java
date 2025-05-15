package projet_jardin.model;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;

import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorColumn;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "type_plante",columnDefinition = "ENUM('fleurs','fruits_legumes')")
@Table(name="plante")
@JsonTypeInfo(use = JsonTypeInfo.Id.CLASS, include = JsonTypeInfo.As.PROPERTY, property = "@class")
@JsonSubTypes({
    @JsonSubTypes.Type(value = Fleur.class, name = "Fleur"),
    @JsonSubTypes.Type(value = FruitLegume.class, name = "FruitLegume")
})
public abstract class Plante {
	
	@Id
	@GeneratedValue(strategy= GenerationType.IDENTITY)
	protected Integer id;
	@Column(name="nom",nullable=false)
	protected String nom;
	@Column(name="description")
	protected String description;
	@Column(name="conseil")
	protected String conseil;
	@Column(name="delai_recolte")
	protected int delaiRecolte; //Un intervalle de recolte en semaines
	@Column(name="duree_vie")
	protected int dureeVie; //Duree de la vie de la plante en semaine
	@Column(name="delai_arrosage")
	protected int delaiArrosage; //Combien de temps avant le prochain arrosage
	@Column(name="icone", length = 100) 
	protected String icone;
	@Column(name="image", length = 100) 
	protected String image;
	
	@OneToMany(mappedBy = "plante")
	protected List<Culture> cultures = new ArrayList<Culture>();
	
	public Plante() {
		// TODO Auto-generated constructor stub
	}
	
	public Plante(String nom, String description,String conseil, int delaiRecolte, int dureeVie, int delaiArrosage, String icone, String image) {
		this.nom = nom;
		this.description = description;
		this.conseil = conseil;
		this.delaiRecolte = delaiRecolte;
		this.dureeVie = dureeVie;
		this.delaiArrosage = delaiArrosage;
		this.icone = icone;
		this.image =image;}
	

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

	public int getDelaiRecolte() {
		return delaiRecolte;
	}

	public void setDelaiRecolte(int delaiRecolte) {
		this.delaiRecolte = delaiRecolte;
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

	public List<Culture> getCultures() {
		return cultures;
	}

	public void setCultures(List<Culture> cultures) {
		this.cultures = cultures;
	}
	
	public String getIcone() {
		return icone;
	}

	public void setIcone(String icone) {
		this.icone = icone;
	}
	
	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	@Override
	public String toString() {
		return "Plante [id=" + id + ", nom=" + nom + ", description=" + description + ", conseil=" + conseil
				+ ", delaiRecolte=" + delaiRecolte + ", dureeVie=" + dureeVie + ", delaiArrosage=" + delaiArrosage
				+ ", icone=" + icone + ", image=" + image + ", cultures=" + cultures + "]";
	}



	

}

	

