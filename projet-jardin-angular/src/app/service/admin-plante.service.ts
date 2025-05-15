import { Injectable } from '@angular/core';
import { PlanteService } from './plante.service';
import { FormGroup } from '@angular/forms';
import { Plante } from '../model/plante';
import { TypePlante } from '../model/type-plante';

@Injectable({
  providedIn: 'root'
})
export class AdminPlanteService {

  constructor( private servicePlante: PlanteService) { }
  
    public savePlante(planteForm: FormGroup, plante: Plante) {
      plante.delaiArrosage = planteForm.value.delaiArrosage,
      plante.delaiRecolte = planteForm.value.delaiRecolte,
      plante.description = planteForm.value.description,
      plante.conseil = planteForm.value.conseil,
      plante.dureeVie = planteForm.value.dureeVie,
      plante.nom = planteForm.value.nom,
      plante.planteType = planteForm.value.planteType 

      console.log(plante);
  
     this.servicePlante.save(plante).subscribe({
        next: () => {
              this.servicePlante.refresh();
            },
            error: (err) => {
              console.error('Erreur lors de la sauvegarde du jardin', err);
            }
          })
        }

    
        
}
