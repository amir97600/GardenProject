import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modification-modal',
  standalone: false,
  templateUrl: './modification-modal.component.html',
  styleUrl: './modification-modal.component.css'
})
export class ModificationModalComponent {
  @Input() titre!: string;
  @Input() placeholder!: string;
  @Input() type: string = 'text';
  @Input() isOpen: boolean = false;
  @Input() requireConfirmation: boolean = false;

  @Output() isOpenChange = new EventEmitter<boolean>();
  @Output() onConfirm = new EventEmitter<string>();

  valeur: string = '';
  statutChangement: string = '';
  confirmationValeur: string = '';

  ouvrir() {
    this.isOpen = true;
    this.isOpenChange.emit(this.isOpen);
  }

  confirmer() {
    this.statutChangement = '';

    if (!this.valeur || this.valeur.trim() === '') {
      this.statutChangement = `${this.placeholder} est vide !`;
      return;
    }

    if (this.requireConfirmation && this.valeur !== this.confirmationValeur) {
      this.statutChangement = 'Les valeurs ne correspondent pas !';
      return;
    }

    this.onConfirm.emit(this.valeur);
    // setTimeout(() => this.fermer(), 1500);
    // this.fermer();
  }

  fermer() {
    this.isOpen = false;
    this.isOpenChange.emit(this.isOpen);
    this.reset();
  }

  reset() {
    this.valeur = '';
    this.confirmationValeur = '';
    this.statutChangement = '';
  }
}