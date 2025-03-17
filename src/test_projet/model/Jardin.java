package test_projet.model;

public class Jardin {
	
	private int numero;
	private String nom;
	private String lieu;
	private int superficie;

	public Jardin(int numero, String nom, String lieu, int superficie) {
		this.numero = numero;
		this.nom = nom;
		this.lieu = lieu;
		this.superficie = superficie;
	}

	


	public int getNumero() {
		return numero;
	}




	public void setNumero(int numero) {
		this.numero = numero;
	}




	public String getNom() {
		return nom;
	}




	public void setNom(String nom) {
		this.nom = nom;
	}




	public String getLieu() {
		return lieu;
	}




	public void setLieu(String lieu) {
		this.lieu = lieu;
	}




	public int getSuperficie() {
		return superficie;
	}




	public void setSuperficie(int superficie) {
		this.superficie = superficie;
	}

	
	
	
}
