package test_projet.test;

import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

import test_projet.model.Client;
import test_projet.model.Utilisateur;

public class Test {

	public static List<Utilisateur> users = new ArrayList<Utilisateur>();
	public static boolean connecte = false;
	public static Utilisateur user = null;
	
	public static String saisieString(String msg) {
		System.out.println(msg);
		Scanner sc = new Scanner(System.in);
		String text = sc.nextLine();
		return text;
	}
	
	public static int saisieInt(String msg) {
		System.out.println(msg);
		Scanner sc = new Scanner(System.in);
		int nb = sc.nextInt();
		return nb;
	}
	
	public static void menuSansCompte() {
		System.out.println("Bienvenue, veuillez vous inscrire où vous connecter");
		System.out.println("1 : Creer un compte");
		if(!users.isEmpty()) {
			System.out.println("2 : Se connecter");
		}
		System.out.println("0 : Quitter");
		
		int nb = saisieInt(" Que choisissez vous : ");
		
		switch (nb) {
		case 1: {
			
			System.out.println("lets'go");
			creerCompte();
			break;
		}
		case 2 :
			connecte = seConnecter();
			if(connecte) {
				menuCompte();
			}
			break;
		case 0:
			System.out.println("Ciao!");
			return;
		default:
			System.out.println("Choix incompréhensif!");
			break;
		}
		menuSansCompte();
	}
	
	public static void creerCompte() {
		String nom = saisieString("Entrez nom : ");
		String prenom = saisieString("Entrez prenom : ");
		String login = saisieString("Entrez login : ");
		String passWord = saisieString("Entrez passWord : ");
		
		Utilisateur user = new Client(login, passWord,nom,prenom);
		users.add(user);
	}
	
	public static boolean seConnecter() {
		String login = saisieString("Entrez login : ");
		String passWord = saisieString("Entrez passWord : ");
		for(Utilisateur user:users) {
			if(user.getLogin().equals(login) && user.getPassword().equals(passWord)) {
				System.out.println("Connexion réussie");
				Test.user = user;
				return true;
			}
		}
		return false;
	}
	
	public static void menuCompte() {
		System.out.println("Bienvenue "+user.getLogin());
		System.out.println("1 : Ajouter un jardin");
		
		System.out.println("0 : Se deconnecter");
		
		int nb = saisieInt(" Que choisissez vous : ");
		
		switch (nb) {
		case 1: {
			
			System.out.println("lets'go");
			break;
		}
		case 2 :
			System.out.println("AH AH");
			break;
		case 0:
			connecte = false;
			return;
		default:
			System.out.println("Choix incompréhensif!");
			break;
		}
		menuCompte();
	}
	
	public static void main(String[] args) {
		if(connecte) {
			menuCompte();
		}
		else {
			menuSansCompte();
		}
	}

}
