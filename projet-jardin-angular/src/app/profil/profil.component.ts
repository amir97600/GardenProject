import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from '../service/client.service';
import { Client } from '../model/client';
import { Badge } from '../model/badge';
import { JardinService } from '../service/jardin.service';
import { Jardin } from '../model/jardin';
import { AuthService } from '../authentification/auth.service';
import { Culture } from '../cultures/culture';
import { PlanteService } from '../service/plante.service';
import { Plante } from '../model/plante';
import { TypePlante } from '../model/type-plante';
import { ModificationModalComponent } from '../modal/modification-modal/modification-modal.component';
import { ConfirmationModalComponent } from '../modal/confirmation-modal/confirmation-modal.component';
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import { AvatarSelectionModalComponent } from '../modal/avatar-selection-modal/avatar-selection-modal.component';
import { BadgeService } from '../service/badge.service';



@Component({
  selector: 'app-profil',
  standalone: false,
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.css',
})
export class ProfilComponent implements OnInit, AfterViewInit {
  client: Client = new Client("", "", "", "","", 0);
  jardin: Jardin = new Jardin("","Paris");
  // Liste de tous les badges 
  badges = Object.entries(Badge).filter(([key, value]) => typeof value === 'number');
  // Liste des badges débloqués par le client en fonction de son score 
  badgesDebloques: string[] = [];
  //Plantes cultivées 
  plantesCultivees: number = 0;
  //Plantes récoltées 
  plantesRecoltees: number = 0;
  //Plante la plus souvent cultivée
  planteFavorite: Plante = new Plante(TypePlante.Fleur, 0, 0, 0, "", "", 0, "-");
  nouveauxBadges: Badge[] = [];
  badgeActuel!: Badge;

  isModalPasswordOpen: boolean = false;
  isModalNomJardinOpen: boolean = false;
  isModalLieuJardinOpen: boolean = false;
  isModalSupprimerCompteOpen: boolean = false;
  isModalPointsOpen: boolean = false;
  isModalAvatarOpen: boolean = false;
  isModalBadgeOpen: boolean = false;

  @ViewChild('passwordModal')
  mdpModificationModal !: ModificationModalComponent

  @ViewChild('nomJardinModal')
  nomJardinModificationModal !: ModificationModalComponent

  @ViewChild('lieuJardinModal')
  lieuJardinModificationModal !: ModificationModalComponent

  @ViewChild('supprimerCompteModal')
  supprimerCompteConfiramtionModal !: ConfirmationModalComponent

  @ViewChild('avatarModal')
  avatarModal !: AvatarSelectionModalComponent

  constructor(private router: Router,
    private clientService: ClientService,
    private jardinService: JardinService,
    private authService: AuthService,
    private planteService: PlanteService,
    private badgeService: BadgeService) { }


  ngOnInit() {
    const login = this.authService.getLoginFromToken();

    this.clientService.findByLogin(login).subscribe(client => {
      this.client = client;

      const currentBadges = this.badgeService.getBadgesForScore(client.score); // nouveaux badges pour ce score
      const storedBadges = this.badgeService.getStoredBadges(login); // badges déjà enregistrés

      this.nouveauxBadges = this.badgeService.getNewlyUnlocked(currentBadges, storedBadges);

      if (this.nouveauxBadges.length > 0) {
        this.afficherBadgeSuivant();
      }

      this.badgeService.storeBadges(login, currentBadges);

      this.badgesDebloques = this.clientService.getBadgesDebloques(this.client, this.badgesDebloques);

      this.jardinService.findById(client.idJardin).subscribe(jardin => {
        this.jardin = jardin;

        this.plantesCultivees = (jardin.cultures).length;

        let cpt = 0;
        for (let culture of jardin.cultures) {
          if (culture.recolte) {
            cpt = cpt + 1;
          }
        }
        this.plantesRecoltees = cpt;

        if (this.jardin?.cultures?.length > 0) {
          const idPlanteFavorite = this.trouverIdPlanteLePlusFrequent(this.jardin.cultures);

          this.planteService.findById(idPlanteFavorite).subscribe(plante => {
            this.planteFavorite = plante;
          });
        }
      });
    });
  }

  ngAfterViewInit() {
    tippy('[data-tippy-content]');
  }

  //Pour trouver la plante favorite
  trouverIdPlanteLePlusFrequent(cultures: Culture[]): number {
    const compteur = new Map<number, number>();

    for (const culture of cultures) {
      compteur.set(culture.idPlante, (compteur.get(culture.idPlante) || 0) + 1);
    }

    let idPlanteMax: number = 0;
    let maxOccurrences = 0;

    for (const [idPlante, occurrences] of compteur.entries()) {
      if (occurrences > maxOccurrences) {
        maxOccurrences = occurrences;
        idPlanteMax = idPlante;
      }
    }

    return idPlanteMax;
  }

  changerPassword(valeur: string) {
    let clientModif: Client = this.client;
    clientModif.password = valeur;

    this.clientService.save(clientModif)
      .subscribe({
        next: () => {
          this.mdpModificationModal.statutChangement = "Mot de passe changé avec succès."
          setTimeout(() => this.mdpModificationModal.fermer(), 1500);
        },
        error: (err) => {
          this.mdpModificationModal.statutChangement = "Erreur lors du changement de mot de passe"
          console.log(err);
        }
      });
  }

  changerNomJardin(valeur: string) {
    let jardinModif: Jardin = this.jardin;
    jardinModif.nom = valeur;

    this.jardinService.save(jardinModif)
      .subscribe({
        next: () => {
          this.nomJardinModificationModal.statutChangement = "Nom du jardin changé avec succès."
          setTimeout(() => this.nomJardinModificationModal.fermer(), 1500);
        },
        error: (err) => {
          this.nomJardinModificationModal.statutChangement = "Erreur lors du changement du nom du jardin"
          console.log(err);
        }
      });
  }

  changerLieuJardin(event: { codePostal: string, ville: string }) {
    let jardinModif: Jardin = this.jardin;
    jardinModif.lieu = event.ville;

    this.jardinService.save(jardinModif)
      .subscribe({
        next: () => {
          this.lieuJardinModificationModal.statutChangement = "Localisation du jardin changé avec succès."
          setTimeout(() => this.lieuJardinModificationModal.fermer(), 1500);
        },
        error: (err) => {
          this.lieuJardinModificationModal.statutChangement = "Erreur lors du changement de la localisation du jardin"
          console.log(err);
        }
      });
  }

  supprimerCompte() {
    this.clientService.delete(this.client).subscribe({
      next: () => this.router.navigate(['']),
      error: (err) => {
        this.supprimerCompteConfiramtionModal.statutChangement = "Erreur lors de la suppression du compte";
        console.log(err);
      }
    });
  }

  changerAvatar(avatarPath: string) {
    let clientModif: Client = this.client;
    clientModif.avatar = `avatars/${avatarPath}`;
    console.log(clientModif);

    this.clientService.save(clientModif)
      .subscribe({
        next: () => { },
        error: (err) => {
          console.log(err);
        }
      });
  }

  afficherBadgeSuivant(): void {
    if (this.nouveauxBadges.length > 0) {
      this.badgeActuel = this.nouveauxBadges.shift()!;
      this.isModalBadgeOpen = true;
    }
  }

  fermerModalBadge(): void {
    this.isModalBadgeOpen = false;

    // Petit délai pour laisser le temps à l’animation de fermeture (optionnel)
    setTimeout(() => {
      this.afficherBadgeSuivant();
    }, 300);
  }

}