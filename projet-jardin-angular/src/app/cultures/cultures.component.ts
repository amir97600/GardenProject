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
  showForm = false; 


  constructor(private cultureService: CultureService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.cultureForm = this.formBuilder.group({
      nom: ['', Validators.required],
      datePlantation: ['', Validators.required],
      dateDernierArrosage: ['', Validators.required]
    });
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }


  //ajoute la  culture à la bDD
  addCulture() {
    if (this.cultureForm.valid) {
      console.log('Formulaire valide, ajout de la culture:', this.cultureForm.value);
      this.cultureService.save(this.cultureForm.value).subscribe(
        (response) => {
          console.log('Culture ajoutée avec succès:', response);
          this.showForm = false;  // --> cache le formulaire après  l'ajout
          this.cultureForm.reset(); 
        },
        (error) => {
          console.error('Erreur lors de l\'ajout de la culture:', error);
        }
      );
    } else {
      console.log('Formulaire invalide');
    }
  }
  
}
