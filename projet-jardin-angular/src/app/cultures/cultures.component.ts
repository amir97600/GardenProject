import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CultureService } from './culture.service';
import { ClientService } from '../service/client.service';
import { AuthService } from '../authentification/auth.service';
import { Culture } from './culture';
import { PlanteService } from '../service/plante.service';
import { Plante } from '../model/plante';

@Component({
  selector: 'app-cultures',
  templateUrl: './cultures.component.html',
  styleUrls: ['./cultures.component.css'],
  standalone: false
})
export class CulturesComponent implements OnInit {
  
  cultureForm!: FormGroup;
  cultures: any[] = [];
  plantes: Plante[] = [];
  showForm = false;
  idJardin!: number;
  cultureSelectionnee: any = null;


  constructor(
    private cultureService: CultureService,
    private formBuilder: FormBuilder,
    private clientService: ClientService,
    private planteService: PlanteService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.cultureForm = this.formBuilder.group({
      nomPlante: [''],
      quantite: [1],
      datePlantation: [''],
      dateDernierArrosage: [''],
      recolte: [false]
    });
  
    this.planteService.findAll().subscribe((plantes: Plante[]) => {
      this.plantes = plantes;
  
      this.cultureService.findAll().subscribe((data: any[]) => {
        this.cultures = data.map(culture => {
          console.log('Culture reçue JSON :', JSON.stringify(culture, null, 2));
          const plante = this.plantes.find(p => p.id === culture.idPlante);
          return {
            ...culture,
            nomPlante: plante ? plante.nom : 'Inconnue'
          };
        });
      });
    });
  
    const login = this.authService.getLoginFromToken();
    this.clientService.findByLogin(login).subscribe((client) => {
      this.idJardin = client.idJardin;
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

    this.cultureService.save(cultureToSave).subscribe(() => {
      this.cultureService.findAll().subscribe((data) => {
        this.cultures = data.map(culture => {
          const plante = this.plantes.find(p => p.id === culture.idPlante);
          return {
            ...culture,
            nomPlante: plante ? plante.nom : ''
          };
        });
      });
    
      this.showForm = false;
      this.cultureForm.reset();
    });
    
  }

  afficherFiche(culture: any): void {
  this.cultureSelectionnee = culture;
}

  getNomPlante(idPlante: number): string {
    const plante = this.plantes.find(p => p.id === idPlante);
    return plante ? plante.nom : '...';
  }
  
  
}
