import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from '../service/client.service';
import { Client } from '../model/client';
import { Badge } from '../model/badge';
import { JardinService } from '../service/jardin.service';
import { Jardin } from '../model/jardin';
import { AuthService } from '../authentification/auth.service';
import { Culture } from '../cultures/culture';



@Component({
  selector: 'app-profil',
  standalone: false,
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.css'
})
export class ProfilComponent {
  client: Client = new Client("","","","",0);
  jardin: Jardin = new Jardin("",0,"Paris");
  // Liste de tous les badges 
  badges = Object.entries(Badge).filter(([key, value]) => typeof value === 'number');
  // Liste des badges débloqués par le client en fonction de son score 
  badgesDebloques: string[] = [];
  //Plantes cultivées 
  plantesCultivees : number = 0;
  //Plantes récoltées 
  plantesRecoltees : number = 0;
  //Plante la plus souvent cultivée 
  // !! CONVERTIR en string nom de plante quand il y aura le PlanteService !!!!!!
  planteFavorite !: number | null;

  constructor(private router : Router, 
    private clientService : ClientService, 
    private jardinService : JardinService,
    private authService : AuthService) {}


  ngOnInit() {
    const login = this.authService.getLoginFromToken();

    this.clientService.findByLogin(login).subscribe(client => {
      this.client = client;
    
    this.badgesDebloques = this.clientService.getBadgesDebloques(this.client, this.badgesDebloques);
    
    this.jardinService.findById(client.idJardin).subscribe( jardin => {
      this.jardin = jardin;

      this.plantesCultivees= (jardin.cultures).length;

      let cpt = 0;
      for (let culture of jardin.cultures)
      {
        if (culture.recolte) {
          cpt = cpt+1;
        }
      }
      this.plantesRecoltees = cpt;

      this.planteFavorite = this.trouverIdPlanteLePlusFrequent(this.jardin.cultures);
    });
            
    });

  }

  //Pour trouver la plante favorite
  trouverIdPlanteLePlusFrequent(cultures: Culture[]): number | null {
    const compteur = new Map<number, number>();
  
    for (const culture of cultures) {
      compteur.set(culture.idPlante, (compteur.get(culture.idPlante) || 0) + 1);
    }
  
    let idPlanteMax: number | null = null;
    let maxOccurrences = 0;
  
    for (const [idPlante, occurrences] of compteur.entries()) {
      if (occurrences > maxOccurrences) {
        maxOccurrences = occurrences;
        idPlanteMax = idPlante;
      }
    }
  
    return idPlanteMax;
  }



  // Modale changer le mot de passe 
  @Input() newPassword!: string;
  isModalPasswordOpen = false;
  changerPassword() {
    if (!this.newPassword || this.newPassword.trim() === "") {
      console.error("Le nouveau mot de passe est vide !");
      return;
    }
    
    let clientModif : Client = this.client;
    clientModif.password = this.newPassword;

    this.clientService.save(clientModif)
    .subscribe({
      next: () => console.log("Mot de passe changé avec succès."),
      error: (err) => console.error("Erreur lors du changement de mot de passe", err),
    });
  }

  ouvrirModalePassword(): void {
    this.isModalPasswordOpen = true;
  }

  fermerModalePassword(): void {
    this.isModalPasswordOpen = false;
  }

  //Modale Chnager le nom du jardin 
  @Input() newNomJardin!: string;
  isModalNomJardinOpen = false;
  changerNomJardin() {
    if (!this.newNomJardin || this.newNomJardin.trim() === "") {
      console.error("Le nom du jardin de passe est vide !");
      return;
    }
    
    let jardinModif : Jardin = this.jardin;
    jardinModif.nom = this.newNomJardin;

    this.jardinService.save(jardinModif)
    .subscribe({
      next: () => console.log("Nom du jardin changé avec succès."),
      error: (err) => console.error("Erreur lors du changement du nom du jardin", err),

    });
  }

  ouvrirModaleNomJardin(): void {
    this.isModalNomJardinOpen = true;
  }

  fermerModaleNomJardin(): void {
    this.isModalNomJardinOpen = false;
  }

  //Modale suppression compte
  isModalSupprimerCompteOpen = false;
  supprimerCompte() {
    this.clientService.delete(this.client).subscribe(() => {
      alert("Compte supprimé !");
    this.router.navigate(['']);
    });
  }

  ouvrirModaleSupprimerCompte(): void {
    this.isModalSupprimerCompteOpen = true;
  }

  fermerModaleSupprimerCompte(): void {
    this.isModalSupprimerCompteOpen = false;
  }

}