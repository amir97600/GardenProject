package test_projet.test;

<<<<<<< HEAD
import java.time.LocalDate;
=======
>>>>>>> ac239c6 (model and test)
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

<<<<<<< HEAD
import test_projet.context.Context;
import test_projet.model.Admin;
import test_projet.model.Client;
import test_projet.model.Culture;
import test_projet.model.Fleur;
import test_projet.model.FruitLegume;
import test_projet.model.Jardin;
=======
import test_projet.model.Client;
>>>>>>> ac239c6 (model and test)
import test_projet.model.Utilisateur;

public class Test {

<<<<<<< HEAD
	public static Context context = Context.getInstance();
	public static List<Utilisateur> users = context.getUsers();
	public static int connecte = context.getConnecte();
	public static Client user = context.getUser();
	public static Admin admin = context.getAdmin();
	public static int numeroJardin=0;
	public static List<Fleur> fleurs = context.getFleurs();
	public static List<FruitLegume> agricoles = context.getAgricoles();
	
=======
	public static List<Utilisateur> users = new ArrayList<Utilisateur>();
	public static boolean connecte = false;
	public static Utilisateur user = null;
>>>>>>> ac239c6 (model and test)
	
	public static String saisieString(String msg) {
		System.out.println(msg);
		Scanner sc = new Scanner(System.in);
		String text = sc.nextLine();
		return text;
	}
	
<<<<<<< HEAD
	public static boolean saisieBoolean(String msg) {
		System.out.println(msg);
		Scanner sc = new Scanner(System.in);
		boolean bool = sc.nextBoolean();
		return bool;
	}
	
=======
>>>>>>> ac239c6 (model and test)
	public static int saisieInt(String msg) {
		System.out.println(msg);
		Scanner sc = new Scanner(System.in);
		int nb = sc.nextInt();
		return nb;
	}
	
	public static void menuSansCompte() {
<<<<<<< HEAD
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
=======
		System.out.println("Bienvenue, veuillez vous inscrire où vous connecter");
		System.out.println("1 : Creer un compte");
		if(!users.isEmpty()) {
			System.out.println("2 : Se connecter");
>>>>>>> ac239c6 (model and test)
		}
		System.out.println("0 : Quitter");
		
		int nb = saisieInt(" Que choisissez vous : ");
		
		switch (nb) {
		case 1: {
			
			System.out.println("lets'go");
<<<<<<< HEAD
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
			if(connecte == 1) {
				menuCompte();
				}
			else if(connecte == 2) {
				menuAdmin();
			}
			
			break;
		case 0:
			System.out.println("Ciao!");
			System.exit(0);
		default:
			System.out.println("Choix incompréhensible!");
=======
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
>>>>>>> ac239c6 (model and test)
			break;
		}
		menuSansCompte();
	}
	
<<<<<<< HEAD
	public static void creerCompteUtilisateur() {
=======
	public static void creerCompte() {
>>>>>>> ac239c6 (model and test)
		String nom = saisieString("Entrez nom : ");
		String prenom = saisieString("Entrez prenom : ");
		String login = saisieString("Entrez login : ");
		String passWord = saisieString("Entrez passWord : ");
		
		Utilisateur user = new Client(login, passWord,nom,prenom);
		users.add(user);
	}
	
<<<<<<< HEAD
	public static void creerCompteAdmin() {
		String login = saisieString("Entrez login : ");
		String passWord = saisieString("Entrez passWord : ");
		
		Admin admin = new Admin(login, passWord);
		users.add(admin);
	}
	
	public static int seConnecter() {
		String login = saisieString("Entrez login : ");
		String passWord = saisieString("Entrez passWord : ");
		int connecte = 0;
		for(Utilisateur user:users) {
			if(user.getLogin().equals(login) && user.getPassword().equals(passWord)) {
				System.out.println("Connexion réussie");
				if(user instanceof Client) {
					context.setUser((Client) user);
					Test.user = context.getUser();
					connecte = 1;
				}
				else {
					context.setAdmin((Admin) user);
					Test.admin = context.getAdmin();
					connecte = 2;
				}
				
				return connecte;
			}
		}
		return connecte;
=======
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
>>>>>>> ac239c6 (model and test)
	}
	
	public static void menuCompte() {
		System.out.println("Bienvenue "+user.getLogin());
		System.out.println("1 : Ajouter un jardin");
<<<<<<< HEAD
		System.out.println("2 : Cultiver le jardin");
=======
		
>>>>>>> ac239c6 (model and test)
		System.out.println("0 : Se deconnecter");
		
		int nb = saisieInt(" Que choisissez vous : ");
		
		switch (nb) {
		case 1: {
<<<<<<< HEAD
			ajouterJardin();
			break;
		}
		case 2 :
			menuJardins();
			break;
		case 0:
			menuSansCompte();
		default:
			System.out.println("Choix incompréhensible!");
=======
			
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
>>>>>>> ac239c6 (model and test)
			break;
		}
		menuCompte();
	}
	
<<<<<<< HEAD
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
			gererJardins();
			break;
		case 3 : 
			menuPlantes();
			break;
		case 0:
			menuSansCompte();
		default:
			System.out.println("Choix incompréhensible!");
			break;
		}
		menuAdmin();
	}
	
	public static void menuUtilisateurs() {
		System.out.println("\n ------------Menu Utilisateurs------------");
        System.out.println("1 : Afficher les utilisateurs ");
        System.out.println("2 : Ajouter un utilisateur ");
        System.out.println("3 : Modifier un utilisateur ");
        System.out.println("4 : Supprimer un utilisateur ");
        System.out.println("0 : Retour");
        int nb = saisieInt(" Que choisissez vous : ");
		
		switch (nb) {
		case 1: {
			
			afficherUtilisateurs();
			break;
		}
		case 2 :
			creerCompteUtilisateur();
			break;
		case 3 : 
			modifierUtilisateur();
			break;
		case 4 : 
			supprimerUtilisateur();
			break;
		case 0:
			menuAdmin();
		default:
			System.out.println("Choix incompréhensible!");
			break;
		}
		menuUtilisateurs();
	}
	
	public static void afficherUtilisateurs() {
		int cpt=0;
		for(Utilisateur user : users) {
			if(user instanceof Client) {
				System.out.println(user);
				cpt++;
			} 
		}
		if(cpt==0) {
			System.out.println("Pas d'utilisateurs");
		}
	}
	
	public static void modifierUtilisateur() {
		if(users.size()<2) {
			System.out.println("Il n'y a pas d'utilisateurs à modifer");
		}
		else {
			afficherUtilisateurs();
			String login = saisieString("Entrez le login de l'utilisateur a modifier");
			Client cl = null;
			
			cl=getUtilisateurByLogin(login);
			
			if(cl == null) {
				System.out.println("L'utilisateur n'existe pas");
			}
			else {
				String nom = saisieString("Nouveau nom");
				String prenom = saisieString("Nouveau prenom");
				login = saisieString("Nouveau login");
				String mdp = saisieString("Nouveau mdp");
				cl.setNom(nom);
				cl.setPrenom(prenom);
				cl.setLogin(login);
				cl.setPassword(mdp);
			}
			
		}
	}
	
	public static void supprimerUtilisateur() {
		if(users.size()<2) {
			System.out.println("Il faudrait déjà créer un utilisateur pour le supprimer");
		}
		else {
			afficherUtilisateurs();
			String login = saisieString("Entrez le login de l'utilisateur a supprimer");
			Client cl = null;
			cl=getUtilisateurByLogin(login);
			if(cl == null) {
				System.out.println("L'utilisateur n'existe pas");
			}
			else {
				users.remove(cl);
			}
		}
			
		
	}
	
	public static Client getUtilisateurByLogin(String login) {
		Client cl = null;
		for(Utilisateur user : users) {
			if(user instanceof Client && user.getLogin().equals(login)) {
				cl = (Client) user;
				
			} 
		}
		return cl;
	}
	
	
	public static void ajouterJardin() {
		if(user.getJardin()==null) {
			String libelle = saisieString("Entrez libelle : ");
			String lieu = saisieString("Entrez le lieu : ");
			int superficie = saisieInt("Entrez la superficie (en m2) : ");
			Jardin jardin = new Jardin(numeroJardin,libelle,lieu,superficie);
			user.setJardin(jardin);
			numeroJardin++;
			System.out.println("\n Jardin configuré avec succès \n");
		}
		else {
			System.out.println("Vous avez déjà un jardin");
		}
	}
	
	public static void gererJardins() {
		if(users.isEmpty()) {
			System.out.println("Il faut d'abord des utilisateurs");
		}
		else {
			afficherUtilisateurs();
			String login = saisieString("Entrer le login de l'utilisateur du jardin : ");
			Client client = getUtilisateurByLogin(login);
			
			
			if (client.getJardin() == null) {
				System.out.println("Cet utilisateur n'a pas de jardin");
			}
			else {
				System.out.println("\n ------------Gerer le Jardin de "+client.getLogin()+" ------------");
		        System.out.println("1 : Afficher les cultures ");
		        System.out.println("2 : Consulter une culture ");
		        System.out.println("0 : Retour");
		        int nb = saisieInt(" Que choisissez vous : ");
				
				switch (nb) {
				case 1: 
					afficherCultures(client);
					break;
				case 2 : 
					consulterCulture(client);
					break;
				case 0:
					menuAdmin();
				default:
					System.out.println("Choix incompréhensible!");
					break;
				}
				gererJardins();
			}
			
		}
		
	}
	
	public static void menuJardins() {
		if(user.getJardin()==null) {
			System.out.println("Configurez d'abord votre jardin");
		}
		else {
			System.out.println("\n ------------Menu Jardins------------");
	        System.out.println("1 : Afficher les cultures ");
	        System.out.println("2 : Ajouter une culture ");
	        System.out.println("3 : Consulter une culture ");
	        System.out.println("4 : Arroser une culture ");
	        System.out.println("0 : Retour");
	        int nb = saisieInt(" Que choisissez vous : ");
			
			switch (nb) {
			case 1: {
				
				afficherCultures(user);
				break;
			}
			case 2 :
				menuAjouterCulture();
				break;
			case 3 : 
				consulterCulture(user);
				break;
			case 5 : 
				arroserCulture();
				break;
			case 0:
				menuCompte();
			default:
				System.out.println("Choix incompréhensible!");
				break;
			}
			menuJardins();
		}
		
	}
	
	public static void consulterCulture(Client client) {
		if(client.getJardin().getCultures().isEmpty()) {
			System.out.println("Vous n'avez pas de culture");
		}
		else {
			afficherCultures(client);
			int n = saisieInt("Entrer le numero de la culture à consulter :");
			Culture culture = client.getJardin().getCultures().get(n);
			
			System.out.println("\n ------------Consulter culture------------");
			System.out.println(culture);
		}
		
	}
	
	public static void afficherCultures(Client client) {
		if(client.getJardin().getCultures().isEmpty()) {
			System.out.println("Vous n'avez pas de culture");
		}
		else {
			for(Culture culture : client.getJardin().getCultures()) {
				System.out.println(culture);
			}
		}
		
	}
	
	private static void arroserCulture() {
        Jardin jardin = ((Client) user).getJardin();

        if(jardin.getCultures().isEmpty()) {
        	System.out.println("Vous n'avez même pas de culture");
        }
        else {
        	for (int i = 0; i < jardin.getCultures().size(); i++) {
                System.out.println(i + "- " +jardin.getCultures().get(i));
            }

            int choixCulture = saisieInt("Saisir l'index de la culture à arroser");
            jardin.getCultures().get(choixCulture).setDateDernierArrosage(LocalDate.now());

        }
        
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
			menuAdmin();
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
            menuPlantes();
            break;
        default:
            System.out.println("Choix incompréhensif!");
            break;
        }
        menuAjouterPlante();
        
    }
	
	public static void menuAfficherPlante() {
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
            menuPlantes();
            break;
        default:
            System.out.println("Choix incompréhensible!");
            break;
        }
        menuAfficherPlante();
    }
	
	private static void afficherListeFruitLegume() {
		if(agricoles.isEmpty()) {
			System.out.println("Il n'y a pas de fruits ni de légumes");
		}
		else {
			for(FruitLegume fruitL : agricoles) {
				System.out.println(fruitL);
			}
		}
	}
	
	private static void afficherListeFleur() {
		if(fleurs.isEmpty()) {
			System.out.println("Il n'y a pas de fleurs");
		}
		else {
			for(Fleur fleur : fleurs) {
				System.out.println(fleur);
			}
		}
	}

	private static void ajouterFleur() {
	        String nom = saisieString("Saisir nom de la fleur ");
	        String description = saisieString("Saisir la description de la fleur");
	        int delaiRecolte = saisieInt("Saisir le délais de floraison en semaine");
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
        System.out.println("1 : Modifier un fruit /légume ");
        System.out.println("2 : Modifier une fleur");
        
        System.out.println("0 : Retour");
        
        int nb = saisieInt(" Que choisissez vous : ");
        
        switch (nb) {
        case 1: { 
            modifierFruitLegume();
            break;
        }
        case 2 :
            modifierFleur();
            break;
        case 0:
            menuPlantes();
            return;
        default:
            System.out.println("Choix incompréhensible!");
            break;
        }
        menuModifierPlantes();
        
    }
	
	public static void modifierFruitLegume() {
		if(agricoles.isEmpty()) {
			System.out.println("Il n'y a pas de fruit ni de légume à modifier");
		}
		else {
			afficherListeFruitLegume();
			String name = saisieString("Entrer le nom de l'élément à modifier :");
			FruitLegume fl = getFruitLegumeByName(name);
			
			if(fl == null) {
				System.out.println("Ce Fruit/Legume n'existe pas");
			}
			else {
				String nom = saisieString("Saisir le nouveau nom du fruit/ légume ");
		        String description = saisieString("Saisir la nouvelle la description du fruit/légume");
		        int delaiRecolte = saisieInt("Saisir le nouveau délais de récolte en semaine");
		        int dureeVie = saisieInt("Saisir la nouvelle durée de vie en semaine");
		        int delaiArrosage = saisieInt("Saisir la nouvelle fréquence d'arrosage en jours");
		        
		        fl.setNom(nom);
		        fl.setDescription(description);
		        fl.setDelaiRecolte(delaiRecolte);
		        fl.setDureeVie(dureeVie);
		        fl.setDelaiArrosage(delaiArrosage);
			}
		}
	}
	
	public static void modifierFleur() {
		if(fleurs.isEmpty()) {
			System.out.println("Il n'y a pas de fleurs à modifier");
		}
		else {
			afficherListeFleur();
			String name = saisieString("Entrer le nom de la fleur à modifier :");
			Fleur fleur = getFleurByName(name);
			
			if(fleur == null) {
				System.out.println("Cette fleur n'existe pas");
			}
			else {
				String nom = saisieString("Saisir le nouveau nom de la fleur ");
		        String description = saisieString("Saisir la nouvelle description de la fleur");
		        int delaiRecolte = saisieInt("Saisir le nouveau délais de floraison en semaine");
		        int dureeVie = saisieInt("Saisir la nouvelle durée de vie en semaine");
		        int delaiArrosage = saisieInt("Saisir la nouvelle fréquence d'arrosage en jours");
		        boolean comestibilite = saisieBoolean("Saisir si la fleur est comestible (true/false)");
		        
		        fleur.setNom(nom);
		        fleur.setDescription(description);
		        fleur.setDelaiRecolte(delaiRecolte);
		        fleur.setDureeVie(dureeVie);
		        fleur.setDelaiArrosage(delaiArrosage);
		        fleur.setComestibilite(comestibilite);
			}
			
		}
	}
	
	private static void menuSupprimerPlantes() {
        System.out.println("\n ------------Menu Supprimer une plante------------");
        System.out.println("1 : Supprimer un fruit /légume ");
        System.out.println("2 : Supprimer une fleur");
        
        System.out.println("0 : Retour");
        
        int nb = saisieInt(" Que choisissez vous : ");
        
        switch (nb) {
        case 1: { 
            supprimerFruitLegume();
            break;
        }
        case 2 :
            supprimerFleur();
            break;
        case 0:
            menuPlantes();
            return;
        default:
            System.out.println("Choix incompréhensible!");
            break;
        }
        menuSupprimerPlantes();
        
    }
	
	private static void supprimerFruitLegume() {
		if(agricoles.isEmpty()) {
			System.out.println("Creez d'abord un fruit ou un légume avant de le supprimer");
		}
		else {
			afficherListeFruitLegume();
			String name = saisieString("Entrer le nom de l'élément à supprimer");
			FruitLegume fl = getFruitLegumeByName(name);
			
			if(fl==null) {
				System.out.println("Ce Fruit/Legume n'existe pas");
			}
			else {
				agricoles.remove(fl);
			}
			
		}
	}
	
	private static void supprimerFleur() {
		if(fleurs.isEmpty()) {
			System.out.println("Creez d'abord une fleur avant de la supprimer");
		}
		else {
			afficherListeFleur();
			String name = saisieString("Entrer le nom de la fleur à supprimer");
			Fleur fleur = getFleurByName(name);

			if(fleur==null) {
				System.out.println("Cette de fleur n'existe pas");
			}
			else {
				fleurs.remove(fleur);
			}
		}
	}
	
	private static void menuAjouterCulture() {
		System.out.println("1 : Planter un fruit ou légume");
		System.out.println("2 : Planter une fleur");
		System.out.println("0 : retour");
		
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
			menuJardins();
		default:
			System.out.println("Choix incompréhensible!");
			break;
		}
		menuAjouterCulture();
	}

	private static FruitLegume getFruitLegumeByName(String name) {
		FruitLegume fruitL = null;
		for(FruitLegume f : agricoles) {
			if(f.getNom().equals(name)) {
				fruitL = f;
			}
		}
		
		return fruitL;
	}
	
	private static Fleur getFleurByName(String name) {
		Fleur fleur = null;
		for(Fleur f : fleurs) {
			if(f.getNom().equals(name)) {
				fleur = f;
			}
		}
		
		return fleur;
	}

	private static void planterFruitLegume() {

	    Jardin jardin = ((Client) user).getJardin();
	    
	    if (jardin == null) {
	        System.out.println("Pas de jardin, crée d'abord le jardin");
	        menuCompte();
	        return;
	    }
	    else {
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
	    	
	 }
	    
	
	private static void planterFleur() {
	    Jardin jardin = ((Client) user).getJardin();
	    
	    if (jardin == null) {
	        System.out.println("Pas de jardin, crée d'abord le jardin");
	    }
	    else {
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
	    
	    		
	}
	
	
	public static void main(String[] args) {
		menuSansCompte();
=======
	public static void main(String[] args) {
		if(connecte) {
			menuCompte();
		}
		else {
			menuSansCompte();
		}
>>>>>>> ac239c6 (model and test)
	}

}
