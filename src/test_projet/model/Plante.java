package test_projet.model;

public abstract class Plante {
	
	protected String nom;
	protected String description;
	protected int delaiRecolte; //Un intervalle de recolte en semaines
	protected int dureeVie; //Duree de la vie de la plante en semaine
	protected int delaiArrosage; //Combien de temps avant le prochain arrosage
	
	public Plante(String nom, String description, int delaiRecolte, int dureeVie, int delaiArrosage) {
		this.nom = nom;
		this.description = description;
		this.delaiRecolte = delaiRecolte;
		this.dureeVie = dureeVie;
		this.delaiArrosage = delaiArrosage;
	}
	
	
	
	
	
	
	

	
	
}
