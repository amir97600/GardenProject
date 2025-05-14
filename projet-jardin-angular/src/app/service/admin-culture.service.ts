import { Injectable } from '@angular/core';
import { CultureService } from '../cultures/culture.service';
import { FormGroup } from '@angular/forms';
import { Culture } from '../cultures/culture';
import { PlanteService } from './plante.service';

@Injectable({
  providedIn: 'root'
})
export class AdminCultureService {

  constructor( private serviceCulture: CultureService, private servicePlante : PlanteService) { }
  
  public saveCulture(cultureForm: FormGroup, culture: Culture) {
    culture.dateDernierArrosage = cultureForm.value.dateDernierArrosage;
    culture.datePlantation = cultureForm.value.datePlantation;

    // Conversion de idJardin, idPlante, et quantite en entier
    culture.idJardin = +cultureForm.value.idJardin;  // Conversion en entier avec l'opérateur +
    culture.idPlante = +cultureForm.value.idPlante;
    culture.quantite = +cultureForm.value.quantite;

    culture.planteType = cultureForm.value.planteType;
    culture.recolte = cultureForm.value.recolte;

    let plante = this.servicePlante.findById(culture.idPlante).subscribe(
      (p) => {
        culture.planteType = p.planteType
        // Sauvegarder la culture
        this.serviceCulture.save(culture).subscribe({
          next: () => {
            this.serviceCulture.refresh();
          },
          error: (err) => {
            console.error('Erreur lors de la sauvegarde de la culture', err);
          }
    });
      }

    )



    
}

  
}
