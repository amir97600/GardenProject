import { Injectable } from '@angular/core';
import { JardinService } from './jardin.service';
import { FormGroup } from '@angular/forms';
import { Jardin } from '../model/jardin';
import { VilleService } from './ville.service';

@Injectable({
  providedIn: 'root'
})
export class AdminJardinService {

  constructor( private serviceJardin: JardinService, private villeService: VilleService) { }
  
    public saveJardin(jardinForm: FormGroup, jardin: Jardin) {
      jardin.nom = jardinForm.value.libelle;
      jardin.lieu = jardinForm.getRawValue().lieu;
      jardin.superficie = jardinForm.value.superficie;
  
      // Sauvegarder le jardin
      this.serviceJardin.save(jardin).subscribe({
        next: () => {
              this.serviceJardin.refresh();
            },
            error: (err) => {
              console.error('Erreur lors de la sauvegarde du jardin', err);
            }
          });
        }
    
             
}
