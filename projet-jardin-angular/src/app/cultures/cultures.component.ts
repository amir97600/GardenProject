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
import { MeteoService } from '../service/meteo.service';

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
  lieuJardin: string | null = null;
  dataPluie: (number | null)[] = [];
  sommePluie: number = 0;


  constructor(
    private cultureService: CultureService,
    private formBuilder: FormBuilder,
    private meteoService: MeteoService,
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
        this.lieuJardin = jardin.lieu;
        const ville = jardin.lieu;
        
        this.meteoService.getPluie(ville).subscribe({
            next: (dataPluie) => {
            this.dataPluie = dataPluie;
            this.sommePluie = dataPluie.reduce((acc, val) => acc + (val ?? 0), 0);
            console.log("Données pluie :", dataPluie);

            const today = new Date().toISOString().split('T')[0]; 

            if (this.sommePluie > 0) {
             this.cultures.forEach(culture => {
              culture.dateDernierArrosage = today;
            });
              console.log("Il a plu, dateDernierArrosage mise à jour pour toutes les cultures.");
            } else {
              console.log("Il n'a pas plu, aucune mise à jour des dates d'arrosage.");
            }

            },
            error: (errPluie) => {
            console.error("Erreur récupération pluie :", errPluie);
            }
            });

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

    console.log('Objet envoyé au serveur :', cultureToSave);

    this.cultureService.save(cultureToSave).subscribe(
      () => {
        this.showForm = false;
        this.cultureForm.reset();

        this.jardinService.findById(this.idJardin).subscribe((jardin: Jardin) => {
          this.cultures = jardin.cultures;
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


afficherFiche(culture: Culture): void {
  this.cultureSelectionnee = culture;
  this.nomPlanteSelectionnee = undefined;
  this.iconePlanteSelectionnee = undefined;


  this.planteService.findById(culture.idPlante).subscribe((plante: Plante) => {
    this.nomPlanteSelectionnee = plante.nom;
    this.iconePlanteSelectionnee = plante.icone;
    this.cultureSelectionnee!.planteType = plante.planteType;
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
    });
  });
}

getNom(plante: Plante): string {
  return plante.nom;
}



}
