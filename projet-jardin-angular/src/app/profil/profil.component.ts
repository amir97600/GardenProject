import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profil',
  standalone: false,
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.css'
})
export class ProfilComponent {

  constructor(private router : Router) {}

}
