import { Component, EventEmitter, Input, Output } from '@angular/core';
import { VilleService } from '../../service/ville.service';

@Component({
  selector: 'app-modification-lieu-modal',
  standalone: false,
  templateUrl: './modification-lieu-modal.component.html',
  styleUrl: './modification-lieu-modal.component.css'
})
export class ModificationLieuModalComponent {

  @Input() titre!: string;
  @Input() placeholder!: string;
  @Input() isOpen: boolean = false;

  @Output() isOpenChange = new EventEmitter<boolean>();
  @Output() onConfirm = new EventEmitter<{ codePostal: string, ville: string }>();

  codePostal: string = '';
  villes: string[] = [];
  villeSelectionnee: string = '';

  statutChangement: string = '';

  constructor(private villeService: VilleService) { }

  ouvrir() {
    this.isOpen = true;
    this.isOpenChange.emit(this.isOpen);
  }

  chargerVilles() {
    if (!this.codePostal || this.codePostal.trim().length < 4) {
      this.villes = [];
      this.villeSelectionnee = '';
      return;
    }

    this.villeService.getVilleByCodePostal(this.codePostal).subscribe({
      next: (villes: string[]) => {
        this.villes = villes;
        this.villeSelectionnee = villes.length > 0 ? villes[0] : '';
      },
      error: () => {
        this.statutChangement = "Erreur lors du chargement des villes.";
        this.villes = [];
      }
    });
  }

  confirmer() {
    this.statutChangement = '';

    if (!this.codePostal || this.codePostal.trim() === '') {
      this.statutChangement = "Le code postal est vide !";
      return;
    }

    if (!this.villeSelectionnee) {
      this.statutChangement = "Aucune ville sélectionnée !";
      return;
    }

    this.onConfirm.emit({ codePostal: this.codePostal, ville: this.villeSelectionnee });
  }

  fermer() {
    this.isOpen = false;
    this.isOpenChange.emit(this.isOpen);
    this.reset();
  }

  reset() {
    this.codePostal = '';
    this.villes = [];
    this.villeSelectionnee = '';
    this.statutChangement = '';
  }
}
