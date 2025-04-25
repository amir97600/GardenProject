import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from '../utilisateur/client/client.service';
import { Client } from '../utilisateur/client/client';
import { Badge } from '../utilisateur/client/badge';

@Component({
  selector: 'app-profil',
  standalone: false,
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.css'
})
export class ProfilComponent {

  constructor(private router : Router, private clientService : ClientService) {}

  client!: Client ;
  badges: Badge[] = [];

  ngOnInit() {
    this.clientService.findById(2).subscribe(client => {
      this.client = client;
      this.badges = this.clientService.getBadgesDébloqués(client.score);
    });
  }

  sauvegarder() {
    this.clientService.save(this.client).subscribe(() => {
      alert("Modifications enregistrées !");
    });
  }
  
}
