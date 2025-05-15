import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CultureService } from './culture.service';
import { ClientService } from '../service/client.service';
import { AuthService } from '../authentification/auth.service';
import { PlanteService } from '../service/plante.service';
import { Plante } from '../model/plante';
import { JardinService } from '../service/jardin.service';
import { Jardin } from '../model/jardin';
import { Culture } from './culture';

@Component({
  selector: 'app-cultures',
  templateUrl: './cultures.component.html',
  styleUrls: ['./cultures.component.css'],
  standalone: false
})
export class CulturesComponent implements OnInit {

  cultureForm!: FormGroup;
  plantes: Plante[] = [];
  showForm = false;
  idJardin!: number;
  cultures: any[] = [];


  constructor(
    private cultureService: CultureService,
    private formBuilder: FormBuilder,
    private clientService: ClientService,
    private planteService: PlanteService,
    private authService: AuthService,
    private jardinService: JardinService

  ) { }

  ngOnInit(): void {
    this.cultureForm = this.formBuilder.group({
      nomPlante: [''],
      quantite: [1],
      datePlantation: [''],
      dateDernierArrosage: [''],
      recolte: [false],

    });


    this.planteService.findAll().subscribe((data: Plante[]) => {
      this.plantes = data;
    });

    const login = this.authService.getLoginFromToken();
    this.clientService.findByLogin(login).subscribe((client) => {
      this.idJardin = client.idJardin;
      this.jardinService.findById(this.idJardin).subscribe((jardin: Jardin) => {
        this.cultures = jardin.cultures;
      });
    });
  }



  ajouterCulture() {
    if (!this.idJardin) {
      return;
    }

    const formValue = this.cultureForm.value;
    const planteChoisie = this.plantes.find((p) => p.nom === formValue.nomPlante);

    if (!planteChoisie) {
      return;
    }

    const cultureToSave = {
      datePlantation: formValue.datePlantation,
      dateDernierArrosage: formValue.dateDernierArrosage,
      quantite: formValue.quantite,
      recolte: formValue.recolte ?? false,
      idJardin: this.idJardin,
      idPlante: planteChoisie.id,
      planteType: planteChoisie.planteType
    };

    this.cultureService.save(cultureToSave).subscribe(
      () => {
        this.showForm = false;
        this.cultureForm.reset();

        this.jardinService.findById(this.idJardin).subscribe((jardin: Jardin) => {
          this.cultures = jardin.cultures;
          this.afficherPopup("🌱 Culture plantée avec succès !");

        });
      }
    );
  }

fermerFormAjout() {
  this.showForm = !this.showForm;
}

AfficherIconeCulture(culture: Culture): string {
  const plante = this.plantes.find(p => p.id === culture.idPlante);
  return plante ? `/${plante.icone}.png` : '/plante_icone.png';
}

AfficherNomCulture(culture: Culture): string {
  return this.plantes.find(p => p.id === culture.idPlante)!.nom;
}



cultureSelectionnee?: Culture;
nomPlanteSelectionnee?: string;
iconePlanteSelectionnee?: string;
joursRestantsAvantRecolte?: number;
progressionRecolte?: number;


afficherFiche(culture: Culture): void {
  this.cultureSelectionnee = culture;
  this.nomPlanteSelectionnee = undefined;
  this.iconePlanteSelectionnee = undefined;
  

  this.planteService.findById(culture.idPlante).subscribe((plante: Plante) => {
    this.nomPlanteSelectionnee = plante.nom;
    this.iconePlanteSelectionnee = plante.icone;

      const plantation = new Date(culture.datePlantation);
      const maintenant = new Date();

      const dateRecolte = new Date(plantation);
      dateRecolte.setDate(plantation.getDate() + plante.delaiRecolte);

      const joursRestants = Math.ceil((dateRecolte.getTime() - maintenant.getTime()) / (1000 * 3600 * 24));
      this.joursRestantsAvantRecolte = joursRestants > 0 ? joursRestants : 0;

      const joursEcoules = plante.delaiRecolte - this.joursRestantsAvantRecolte;
      const progression = (joursEcoules / plante.delaiRecolte) * 100;
      this.progressionRecolte = Math.min(100, Math.max(0, Math.round(progression)));

 


  });

}



arroserCulture(): void {
  if (!this.cultureSelectionnee) return;

  const cultureArrosee = {
    ...this.cultureSelectionnee,
    dateDernierArrosage: new Date().toISOString().split('T')[0],
  };

  this.cultureService.save(cultureArrosee).subscribe(() => {
    this.jardinService.findById(this.idJardin).subscribe(jardin => {
      this.cultures = jardin.cultures;
      this.cultureSelectionnee = undefined;
      this.nomPlanteSelectionnee = undefined;
      this.iconePlanteSelectionnee = undefined;
      this.afficherPopup("💧 Culture arrosée !");

    });
  });
}



supprimerCulture(): void {
  if (!this.cultureSelectionnee) return;

  this.cultureService.delete(this.cultureSelectionnee.id).subscribe(() => {
    this.cultureSelectionnee = undefined;
    this.nomPlanteSelectionnee = undefined;

    this.jardinService.findById(this.idJardin).subscribe(jardin => {
      this.cultures = jardin.cultures;
      this.afficherPopup("❌ Culture supprimée !");

    });
  });
}


recolterCulture(): void {
  if (!this.cultureSelectionnee) return;

  const cultureRecoltee = {
    ...this.cultureSelectionnee,
    recolte: true,

  };
  console.log('Objet envoyé :', cultureRecoltee);

  this.cultureService.save(cultureRecoltee).subscribe(() => {
    this.cultureSelectionnee = undefined;
    this.nomPlanteSelectionnee = undefined;

    this.jardinService.findById(this.idJardin).subscribe(jardin => {
      this.cultures = jardin.cultures;
      this.afficherPopup("🧺 Récolte effectuée !");

    });
  });
}

getNom(plante: Plante): string {
  return plante.nom;
}


popupMessage: string | null = null;

afficherPopup(message: string): void {
  this.popupMessage = message;
  setTimeout(() => {
    this.popupMessage = null;
  }, 3000); 
}



}
