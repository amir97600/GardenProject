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

  toggleForm() {
    this.showForm = !this.showForm;
  }

  addCulture() {
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

cultureSelectionnee?: Culture;
nomPlanteSelectionnee?: string;

afficherFiche(culture: Culture): void {
  this.cultureSelectionnee = culture;
  this.nomPlanteSelectionnee = undefined;

  this.planteService.findById(culture.idPlante).subscribe((plante: Plante) => {
    this.nomPlanteSelectionnee = plante.nom;
  });
}


}
