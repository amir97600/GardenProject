import { Component, Input } from '@angular/core';
import { Plante } from '../model/plante';

@Component({
  selector: 'plant-card',
  standalone: false,
  templateUrl: './plant-card.component.html',
  styleUrl: './plant-card.component.css'
})
export class PlantCardComponent {

  @Input() plante!: Plante;

  isModalOpen = false;

  ouvrirModal(): void {
    console.log("Ouverture de la modale...");
    this.isModalOpen = true;
  }

  fermerModal(): void {
    console.log("Fermeture de la modale...");
    this.isModalOpen = false;
  }

}
