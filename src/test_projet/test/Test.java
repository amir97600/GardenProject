package test_projet.test;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

import test_projet.context.Context;
import test_projet.model.Admin;
import test_projet.model.Client;
import test_projet.model.Culture;
import test_projet.model.Fleur;
import test_projet.model.FruitLegume;
import test_projet.model.Jardin;
import test_projet.model.Utilisateur;

public class Test {

	public static Context context = Context.getInstance();
	public static List<Utilisateur> users = context.getUsers();
	public static boolean connecte = false;
	public static Client user = null;
	public static Admin admin = null;
	public static int numeroJardin=0;
	public static List<Fleur> fleurs = new ArrayList();
	public static List<FruitLegume> agricoles = new ArrayList();
	
	
	public static String saisieString(String msg) {
		System.out.println(msg);
		Scanner sc = new Scanner(System.in);
		String text = sc.nextLine();
		return text;
	}
	
	public static boolean saisieBoolean(String msg) {
		System.out.println(msg);
		Scanner sc = new Scanner(System.in);
		boolean bool = sc.nextBoolean();
		return bool;
	}
	
	public static int saisieInt(String msg) {
		System.out.println(msg);
		Scanner sc = new Scanner(System.in);
		int nb = sc.nextInt();
		return nb;
	}
	
	public static void menuSansCompte() {
		if(users.isEmpty()) {
			System.out.println("######################\t\t GardenApp \t\t###############################\n\n");
			System.out.println("Bienvenue, veuillez vous inscrire");
			System.out.println("1 : Creer un compte Utilisateur");
			System.out.println("2 : Creer un compte Admin");
		}
		else {
			System.out.println("Bienvenue, veuillez vous inscrire ou vous connecter");
			System.out.println("1 : Creer un compte Utilisateur");
			System.out.println("2 : Creer un compte Admin");
			System.out.println("3 : Se connecter");
		}
		System.out.println("0 : Quitter");
		
		int nb = saisieInt(" Que choisissez vous : ");
		
		switch (nb) {
		case 1: {
			
			System.out.println("lets'go");
			creerCompteUtilisateur();
			break;
		}
		case 2: {
			
			System.out.println("lets'go");
			creerCompteAdmin();
			break;
		}
		case 3 :
			connecte = seConnecter();
			if(connecte) {
				if(admin == null) {
					menuCompte();
				}
				else {
					menuAdmin();
				}
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
	
	public static void creerCompteUtilisateur() {
		String nom = saisieString("Entrez nom : ");
		String prenom = saisieString("Entrez prenom : ");
		String login = saisieString("Entrez login : ");
		String passWord = saisieString("Entrez passWord : ");
		
		Utilisateur user = new Client(login, passWord,nom,prenom);
		users.add(user);
	}
	
	public static void creerCompteAdmin() {
		String login = saisieString("Entrez login : ");
		String passWord = saisieString("Entrez passWord : ");
		
		Admin admin = new Admin(login, passWord);
		users.add(admin);
	}
	
	public static boolean seConnecter() {
		String login = saisieString("Entrez login : ");
		String passWord = saisieString("Entrez passWord : ");
		for(Utilisateur user:users) {
			if(user.getLogin().equals(login) && user.getPassword().equals(passWord)) {
				System.out.println("Connexion réussie");
				if(user instanceof Client) {
					Test.user = (Client) user;
				}
				else {
					Test.admin = (Admin) user;
				}
				
				return true;
			}
		}
		return false;
	}
	
	public static void menuCompte() {
		System.out.println("Bienvenue "+user.getLogin());
		System.out.println("1 : Ajouter un jardin");
		if(user.getJardin()!=null) {
			System.out.println("2 : Gerer le jardin");
		}
		System.out.println("0 : Se deconnecter");
		
		int nb = saisieInt(" Que choisissez vous : ");
		
		switch (nb) {
		case 1: {
			
			ajouterJardin();
			System.out.println("\n Jardin configuré avec succès \n");
			break;
		}
		case 2 :
			menuJardins();
			break;
		case 0:
			connecte = false;
			return;
		default:
			System.out.println("Choix incompréhensible!");
			break;
		}
		menuCompte();
	}
	
	public static void menuAdmin() {
		System.out.println("Menu admin");
		System.out.println("Compte : "+admin.getLogin());
		System.out.println("1 Gerer les utilisateurs");
		System.out.println("2 Gerer les jardins");
		System.out.println("3 Gerer les plantes");
		System.out.println("0 : Se deconne1cter");
		
		int nb = saisieInt(" Que choisissez vous : ");
		
		switch (nb) {
		case 1: {
			
			menuUtilisateurs();
			break;
		}
		case 2 :
			menuJardins();
			break;
		case 3 : 
			menuPlantes();
			break;
		case 0:
			connecte = false;
			return;
		default:
			System.out.println("Choix incompréhensible!");
			break;
		}
		menuAdmin();
	}
	
	public static void menuUtilisateurs() {
		System.out.println("\n ------------Menu Utilisateurs------------");
        System.out.println("1 : Afficher les utilisateurs ");
        System.out.println("2 : Ajouter une utilisateur ");
        System.out.println("3 : Modifier un utilisateur ");
        System.out.println("4 : Supprimer un utilisateur ");
        System.out.println("0 : Retour");
        int nb = saisieInt(" Que choisissez vous : ");
		
		switch (nb) {
		case 1: {
			
			menuAfficherPlante();
			break;
		}
		case 2 :
			menuAjouterPlante();
			break;
		case 3 : 
			menuModifierPlantes();
			break;
		case 4 : 
			menuSupprimerPlantes();
			break;
		case 0:
			connecte = false;
			return;
		default:
			System.out.println("Choix incompréhensible!");
			break;
		}
		menuPlantes();
	}
	
	public static void afficherUtilisateurs() {
		for(Utilisateur user : users) {
			if(user instanceof Client) {
				System.out.println(user);
				
			} 
		}
	}
	
	public static void ajouterJardin() {
		String libelle = saisieString("Entrez libelle : ");
		String lieu = saisieString("Entrez nom : ");
		int superficie = saisieInt("Entrez superficie : ");
		Jardin jardin = new Jardin(numeroJardin,libelle,lieu,superficie);
		user.setJardin(jardin);
		numeroJardin++;
	}
	
	public static void menuJardins() {
		System.out.println("\n ------------Menu Jardins------------");
        System.out.println("1 : Afficher les cultures ");
        System.out.println("2 : Ajouter une culture ");
        System.out.println("3 : Consulter une culture ");
        System.out.println("4 : Arroser une culture ");
        System.out.println("0 : Retour");
        int nb = saisieInt(" Que choisissez vous : ");
		
		switch (nb) {
		case 1: {
			
			afficherCultures();
			break;
		}
		case 2 :
			menuAjouterCulture();
			break;
		case 3 : 
			consulterCulture();
			break;
		case 5 : 
			arroserCulture();
			break;
		case 0:
			connecte = false;
			return;
		default:
			System.out.println("Choix incompréhensible!");
			break;
		}
		menuJardins();
	}
	
	public static void consulterCulture() {
		System.out.println("\n ------------Consulter culture------------");
	}
	
	public static void afficherCultures() {
		for(Culture culture : user.getJardin().getCultures()) {
			System.out.println(culture);
		}
	}
	
	private static void arroserCulture() {
        Jardin jardin = ((Client) user).getJardin();

        for (int i = 0; i < jardin.getCultures().size(); i++) {
            System.out.println(i + "- " +jardin.getCultures().get(i));
        }

        int choixCulture = saisieInt("Saisir l'index de la culture à arroser");
        jardin.getCultures().get(choixCulture).setDateDernierArrosage(LocalDate.now());

    }
	
	public static void menuPlantes() {
		System.out.println("\n ------------Menu Plantes------------");
        System.out.println("1 : Afficher les plantes ");
        System.out.println("2 : Ajouter une plante ");
        System.out.println("3 : Modifier une plante ");
        System.out.println("4 : Supprimer une plante ");
        System.out.println("0 : Retour");
        int nb = saisieInt(" Que choisissez vous : ");
		
		switch (nb) {
		case 1: {
			
			menuAfficherPlante();
			break;
		}
		case 2 :
			menuAjouterPlante();
			break;
		case 3 : 
			menuModifierPlantes();
			break;
		case 4 : 
			menuSupprimerPlantes();
			break;
		case 0:
			connecte = false;
			return;
		default:
			System.out.println("Choix incompréhensible!");
			break;
		}
		menuPlantes();
	}
	

	private static void menuAjouterPlante() {
        System.out.println("\n ------------Menu Ajouter une plante------------");
        System.out.println("1 : Ajouter un fruit /légume ");
        System.out.println("2 : Ajouter une fleur");
        
        System.out.println("0 : Retour");
        
        int nb = saisieInt(" Que choisissez vous : ");
        
        switch (nb) {
        case 1: { 
            ajouterFruitLegume();
            break;
        }
        case 2 :
            ajouterFleur();
            break;
        case 0:
            menuAdmin();
            return;
        default:
            System.out.println("Choix incompréhensif!");
            break;
        }
        menuAjouterPlante();
        
    }
	
	public static void menuAfficherPlante() {
        System.out.println("Bienvenue "+user.getLogin());
        System.out.println("1 : Afficher la liste des fruits /légumes ");
        System.out.println("2 : Afficher la liste des fleurs");
        
        System.out.println("0 : Retour");
        
        int nb = saisieInt(" Que choisissez vous : ");
        
        switch (nb) {
        case 1: { 
            afficherListeFruitLegume();
            break;
        }
        case 2 :
            afficherListeFleur();
            break;
        case 0:
            menuAdmin();
            return;
        default:
            System.out.println("Choix incompréhensif!");
            break;
        }
        menuAfficherPlante();
    }
	
	private static void afficherListeFruitLegume() {
		for(FruitLegume fruitL : agricoles) {
			System.out.println(fruitL);
		}
	}
	
	private static void afficherListeFleur() {
		for(Fleur fleur : fleurs) {
			System.out.println(fleur);
		}
	}

	private static void ajouterFleur() {
	        String nom = saisieString("Saisir nom de la fleur ");
	        String description = saisieString("Saisir la description de la fleur");
	        int delaiRecolte = saisieInt("Saisir le délais de récolte en semaine");
	        int dureeVie = saisieInt("Saisir la durée de vie en semaine");
	        int delaiArrosage = saisieInt("Saisir la fréquence d'arrosage en jours");
	        boolean comestibilite = saisieBoolean("Saisir si la fleur est comestible (true/false)");
	        
	        Fleur fleur = new Fleur (nom, description, delaiRecolte, dureeVie, delaiArrosage, comestibilite);
	        
	        fleurs.add(fleur);
	        }
	
	private static void ajouterFruitLegume() {
	        String nom = saisieString("Saisir nom du fruit/ légume ");
	        String description = saisieString("Saisir la description du fruit/légume");
	        int delaiRecolte = saisieInt("Saisir le délais de récolte en semaine");
	        int dureeVie = saisieInt("Saisir la durée de vie en semaine");
	        int delaiArrosage = saisieInt("Saisir la fréquence d'arrosage en jours");
	        
	        FruitLegume fruit = new FruitLegume (nom, description, delaiRecolte, dureeVie, delaiArrosage);
	        
	        agricoles.add(fruit);
	    }
	
	private static void menuModifierPlantes() {
        System.out.println("\n ------------Menu Modifier une plante------------");
       
        menuModifierPlantes();
        
    }
	
	private static void menuSupprimerPlantes() {
        System.out.println("\n ------------Menu Modifier une plante------------");
       
        menuModifierPlantes();
        
    }
	
	private static void menuAjouterCulture() {
		System.out.println("1 : Planter un fruit ou légume");
		System.out.println("2 : Planter une fleur");
		System.out.println("0 : Se deconnecter");
		
		int nb = saisieInt(" Que choisissez vous : ");
		
		switch (nb) {
		case 1: {
			
			planterFruitLegume();
			break;
		}
		case 2 :
			planterFleur();
			break;
		case 0:
			connecte = false;
			return;
		default:
			System.out.println("Choix incompréhensible!");
			break;
		}
	}


	private static void planterFruitLegume() {

	    Jardin jardin = ((Client) user).getJardin();
	    if (jardin == null) {
	        System.out.println("pas de jardin, crée d'abord le jardin");
	        menuCompte();
	        return;
	    }
	    
	    for (int i = 0; i < agricoles.size(); i++) {
	        System.out.println(i + "- " +agricoles.get(i));
	    }
	    
	    int choix = saisieInt("Voulez-vous planter une plante qui se trouve dans cette liste ? \n 1: Oui \n 2: Non");
	    if (choix == 1) {
		    int indexPlante = saisieInt("Saisir l'index de la plante");
		    
		    int quantite = saisieInt("Saisir la quantité");
            LocalDate datePlantation = LocalDate.now();
            LocalDate dateArrosage = LocalDate.parse(saisieString("Saisir la date du premier arrosage:"));
            boolean recolte = false;

		    Culture nouvelleCulture = new Culture(quantite, datePlantation, dateArrosage, recolte, jardin, agricoles.get(indexPlante));    
	        jardin.getCultures().add(nouvelleCulture);

	    }else {
	    	
	    	String nom = saisieString("Saisir le nom de la plante ");
	        String description = saisieString("Saisir une description de la plante ");
	        int delaiRecolte = saisieInt("Saisir le délai de récolte ");
	        int dureeVie = saisieInt("Saisir la durée de vie de la plante ");
	        int delaiArrosage = saisieInt("Entrez le délai d'arrosage ");
	    	
	        FruitLegume nouvellePlante = new FruitLegume(nom,description,delaiRecolte,dureeVie,delaiArrosage);
	    	
		    int quantite = saisieInt("Saisir la quantité");
            LocalDate datePlantation = LocalDate.now();
            LocalDate dateArrosage = LocalDate.parse(saisieString("Saisir la date du premier arrosage"));
            boolean recolte = false;

		    Culture nouvelleCulture = new Culture(quantite, datePlantation, dateArrosage, recolte, jardin, nouvellePlante);    
	        jardin.getCultures().add(nouvelleCulture);
	    }
	    	
	    }
	    
	
	private static void planterFleur() {
	    Jardin jardin = ((Client) user).getJardin();
	    
	    if (jardin == null) {
	        System.out.println("pas de jardin, crée d'abord le jardin");
	        menuCompte();
	        return;
	    }
	    
	    for (int i = 0; i < fleurs.size(); i++) {
	        System.out.println(i + "- " +fleurs.get(i));
	    }
	    
	    int choix = saisieInt("Voulez-vous planter une plante qui se trouve dans cette liste ? \n 1: Oui \n 2: Non");
	    if (choix == 1) {
		    int indexPlante = saisieInt("Saisir l'index de la plante");
		    
		    int quantite = saisieInt("Saisir la quantité");
            LocalDate datePlantation = LocalDate.now();
            LocalDate dateArrosage = LocalDate.parse(saisieString("Saisir la date du premier arrosage:"));
            boolean recolte = false;

		    Culture nouvelleCulture = new Culture(quantite, datePlantation, dateArrosage, recolte, jardin, fleurs.get(indexPlante));    
	        jardin.getCultures().add(nouvelleCulture);

	    }else {
	    	
	    	String nom = saisieString("Saisir le nom de la plante ");
	        String description = saisieString("Saisir une description de la plante ");
	        int delaiRecolte = saisieInt("Saisir le délai de récolte ");
	        int dureeVie = saisieInt("Saisir la durée de vie de la plante ");
	        int delaiArrosage = saisieInt("Entrez le délai d'arrosage ");
	        boolean comestibilite = saisieBoolean("Fleur comestible , (true/false)");
	    	
	        Fleur nouvellePlante = new Fleur(nom,description,delaiRecolte,dureeVie,delaiArrosage,comestibilite);
	    	
		    int quantite = saisieInt("Saisir la quantité");
            LocalDate datePlantation = LocalDate.now();
            LocalDate dateArrosage = LocalDate.parse(saisieString("Saisir la date du premier arrosage"));
            boolean recolte = false;

		    Culture nouvelleCulture = new Culture(quantite, datePlantation, dateArrosage, recolte, jardin, nouvellePlante);    
	        jardin.getCultures().add(nouvelleCulture);
	    }		
	}
	
	
	public static void main(String[] args) {
		menuSansCompte();
	}

}
