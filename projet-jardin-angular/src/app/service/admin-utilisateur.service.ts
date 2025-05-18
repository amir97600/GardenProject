import { Injectable } from '@angular/core';
import { VilleService } from './ville.service';
import { FormGroup } from '@angular/forms';
import { JardinService } from './jardin.service';
import { Observable, of, switchMap } from 'rxjs';
import { Jardin } from '../model/jardin';
import { Client } from '../model/client';
import { ClientService } from './client.service';
import { Admin } from '../model/admin';
import { AdminService } from './admin.service';

@Injectable({
  providedIn: 'root'
})
export class AdminUtilisateurService {

  constructor(private villeService: VilleService,
              private serviceJardin: JardinService,
              private clientService: ClientService,
              private adminService: AdminService
             ) { }

  public saveClient(clientForm: FormGroup, jardin: Jardin, client: Client, savedJardinId: number) {
    jardin.nom = clientForm.value.jardin;
    jardin.lieu = clientForm.getRawValue().lieu;

    client.nom = clientForm.value.nom;
    client.prenom = clientForm.value.prenom;
    client.login = clientForm.value.login;
    client.password = clientForm.value.password;
    client.email = clientForm.value.email;

    // Sauvegarder le jardin
    this.serviceJardin.save(jardin).subscribe({
      next: (savedJardin) => {
        // Une fois le jardin sauvegardé, préparer et sauvegarder le client
        
        client.idJardin = savedJardin.numero; // Utiliser l'ID du jardin sauvegardé

        this.clientService.save(client).subscribe({
          next: () => {
            // Réinitialiser les valeurs après la sauvegarde
            client = new Client('', '', '', '','', 0);
            jardin = new Jardin('','Paris');
            savedJardinId = 0;

            // Rafraîchir les clients
            this.clientService.refresh();
          },
          error: (err) => {
            console.error('Erreur lors de la sauvegarde du client', err);
            // Tu peux aussi afficher un message d'erreur à l'utilisateur si nécessaire
          }
        });
      },
      error: (err) => {
        console.error('Erreur lors de la sauvegarde du jardin', err);
        // Afficher un message d'erreur en cas de problème avec la sauvegarde du jardin
      }
    });
  }

  public saveAdmin(admin: Admin, adminForm: FormGroup) : boolean{
    admin.login = adminForm.value.login;
    admin.password = adminForm.value.password;

    this.adminService.save(admin).pipe().subscribe(()=>{
      admin = new Admin('', '');      
      this.adminService.refresh();
      return true;
    })

    return false;
  }
          
          
        
            
  

  
}
