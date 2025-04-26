import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from '../service/client.service';
import { Client } from '../model/client';
import { Badge } from '../model/badge';

@Component({
  selector: 'app-profil',
  standalone: false,
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.css'
})
export class ProfilComponent {
  client!: Client;
  badges = Object.entries(Badge).filter(([key, value]) => typeof value === 'number');
  badgesDebloques: string[] = [];
  

  constructor(private router : Router, private clientService : ClientService) {}

  allBadges: { name: string; unlocked: boolean }[] = [];

  ngOnInit() {
    this.clientService.findById(2).subscribe(client => {
      this.client = client; 
      console.log(`LE CLIENT:`, this.client );
    
    this.badgesDebloques = this.clientService.getBadgesDebloques(this.client, this.badgesDebloques);
    
    console.log("Badges :", this.badgesDebloques);
    console.log(this.badges);
            
    });
  }

  sauvegarder() {
    this.clientService.save(this.client).subscribe(() => {
      alert("Modifications enregistrées !");
    });
  }
 
  
}
