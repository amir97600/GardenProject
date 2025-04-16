package projet_jardin.model;

import java.util.ArrayList;
import java.util.List;

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
public abstract class Plante {
	
	@Id
	@GeneratedValue(strategy= GenerationType.IDENTITY)
	protected Integer id;
	@Column(name="nom",nullable=false)
	protected String nom;
	@Column(name="description")
	protected String description;
	@Column(name="delai_recolte")
	protected int delaiRecolte; //Un intervalle de recolte en semaines
	@Column(name="duree_vie")
	protected int dureeVie; //Duree de la vie de la plante en semaine
	@Column(name="delai_arrosage")
	protected int delaiArrosage; //Combien de temps avant le prochain arrosage
	
	@OneToMany(mappedBy = "plante")
	protected List<Culture> cultures = new ArrayList<Culture>();
	
	public Plante() {
		// TODO Auto-generated constructor stub
	}
	
	public Plante(String nom, String description, int delaiRecolte, int dureeVie, int delaiArrosage) {
		this.nom = nom;
		this.description = description;
		this.delaiRecolte = delaiRecolte;
		this.dureeVie = dureeVie;
		this.delaiArrosage = delaiArrosage;
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

	@Override
	public String toString() {
		return "Plante [id=" + id + ", nom=" + nom + ", description=" + description + ", delaiRecolte=" + delaiRecolte
				+ ", dureeVie=" + dureeVie + ", delaiArrosage=" + delaiArrosage + ", cultures=" + cultures + "]";
	}

	

}

	

