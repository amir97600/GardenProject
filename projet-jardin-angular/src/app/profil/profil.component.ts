import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from '../service/client.service';
import { Client } from '../model/client';
import { Badge } from '../model/badge';
import { JardinService } from '../service/jardin.service';
import { Jardin } from '../model/jardin';
import { jwtDecode } from 'jwt-decode';



@Component({
  selector: 'app-profil',
  standalone: false,
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.css'
})
export class ProfilComponent {
  client: Client = new Client("","","","",0);
  jardin: Jardin = new Jardin("",0);
  // Liste de tous les badges 
  badges = Object.entries(Badge).filter(([key, value]) => typeof value === 'number');
  // Liste des badges débloqués par le client en fonction de son score 
  badgesDebloques: string[] = [];

  constructor(private router : Router, private clientService : ClientService, private jardinService : JardinService) {}


  ngOnInit() {
    const login = this.getLoginFromToken();

    this.clientService.findByLogin(login).subscribe(client => {
      this.client = client;
    
    this.badgesDebloques = this.clientService.getBadgesDebloques(this.client, this.badgesDebloques);
    
    this.jardinService.findById(client.idJardin).subscribe( jardin => {
      this.jardin = jardin;
    });
            
    });

  }

  sauvegarder() {
    this.clientService.save(this.client).subscribe(() => {
      alert("Modifications enregistrées !");
    });
  }

  getLoginFromToken() {
    const token = localStorage.getItem('token'); 

    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        return decoded.sub;  
      } catch (error) {
        console.error('Erreur lors du décodage du token', error);
        return null;
      }
    }

    return null;  
  }
}
 
