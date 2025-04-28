import { Component } from '@angular/core';
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
  jardin: Jardin = new Jardin("",0);
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

  sauvegarder() {
    this.clientService.save(this.client).subscribe(() => {
      alert("Modifications enregistrées !");
    });
  }

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

  changerPassword(newPassword : string) {
    if (!newPassword || newPassword.trim() === "") {
      console.error("Le nouveau mot de passe est vide !");
      return;
    }
    
    let clientModif : Client = this.client;
    clientModif.password = newPassword;

    this.clientService.save(clientModif)
    .subscribe({
      next: () => console.log("Mot de passe changé avec succès."),
      error: (err) => console.error("Erreur lors du changement de mot de passe", err),
    });
  }

}