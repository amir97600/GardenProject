import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CultureService } from './culture.service';

@Component({
  selector: 'app-cultures',
  templateUrl: './cultures.component.html',
  styleUrls: ['./cultures.component.css'],
  standalone: false
})
export class CulturesComponent implements OnInit {

  cultureForm!: FormGroup;
  plantes: any[] = [];
  showForm = false; 


  constructor(private cultureService: CultureService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.cultureForm = this.formBuilder.group({
      idJardin: [''],
      nomPlante: [''],
      quantite: [1],
      datePlantation: [''],
      dateDernierArrosage: [''],
      recolte: [false]

    });

    this.cultureService.findAllPlantes().subscribe((data) => {
      this.plantes = data;
    });
  }
  
  

  toggleForm() {
    this.showForm = !this.showForm;
  }


  addCulture() {
    const formValue = this.cultureForm.value;
    const planteChoisie = this.plantes.find((p: any) => p.nom === formValue.nomPlante);
  
    if (!planteChoisie) {
      console.error('Plante non trouvée');
      return;
    }
  
    const cultureToSave = {
      datePlantation: formValue.datePlantation,
      dateDernierArrosage: formValue.dateDernierArrosage,
      quantite: formValue.quantite,
      recolte: formValue.recolte,
      idJardin: formValue.idJardin,
      idPlante: planteChoisie.id,
      planteType: planteChoisie.planteType 
    };
  
  
    console.log('OBJET ENVOYÉ AU SERVEUR:', cultureToSave);

    this.cultureService.save(cultureToSave).subscribe(
      (response) => {
        console.log('Culture ajoutée avec succès:', response);
        this.showForm = false;
        this.cultureForm.reset();
      },
      (error) => {
        console.error('Erreur lors de l\'ajout de la culture:', error);
      }
    );
  }
}  
  
  
  
  

