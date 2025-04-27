import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from '../service/client.service';
import { Client } from '../model/client';
import { Badge } from '../model/badge';
import { JardinService } from '../service/jardin.service';
import { Jardin } from '../model/jardin';
import { AuthService } from '../authentification/auth.service';



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

  constructor(private router : Router, 
    private clientService : ClientService, 
    private jardinService : JardinService,
    private authService : AuthService) {}


  ngOnInit() {
    const login = this.authService.getLoginFromToken();

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

}