import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Badge } from '../model/badge';
import { ClientService } from '../service/client.service';
import { Client } from '../model/client';

@Component({
  selector: 'app-profil',
  standalone: false,
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.css'
})
export class ProfilComponent {
  client!: Client;
  Badge = Badge;
  badges: string[] = [];
  

  constructor(private router : Router, private clientService : ClientService) {}

  allBadges: { name: string; unlocked: boolean }[] = [];

  ngOnInit() {
    this.clientService.findById(2).subscribe(client => {
      this.client = client; 
      console.log(`LE CLIENT:`, client );
    
    this.clientService.getBadgesDebloques(this.client, this.badges);
            
    });
  }

  sauvegarder() {
    this.clientService.save(this.client).subscribe(() => {
      alert("Modifications enregistrées !");
    });
  }
 
  
}
