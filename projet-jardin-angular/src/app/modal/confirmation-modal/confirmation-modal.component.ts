import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirmation-modal',
  standalone: false,
  templateUrl: './confirmation-modal.component.html',
  styleUrl: './confirmation-modal.component.css'
})
export class ConfirmationModalComponent {
  @Input() titre!: string;
  @Input() titreStyle: { [klass: string]: any } = {};
  @Input() isOpen: boolean = false;
  @Input() dataToDelete: any;

  @Output() isOpenChange = new EventEmitter<boolean>();
  @Output() onConfirm = new EventEmitter();

  statutChangement: string = '';

  ouvrir() {
    this.isOpen = true;
    this.isOpenChange.emit(this.isOpen);
  }

  confirmer() {
    this.statutChangement = '';

    this.onConfirm.emit();
    setTimeout(() => this.fermer(), 1500);
  }

  confirmerEmit(){
    this.statutChangement = '';
    this.onConfirm.emit(this.dataToDelete); // envoie l'item à supprimer
    setTimeout(() => this.fermer(), 1500);
  }

  fermer() {
    this.isOpen = false;
    this.isOpenChange.emit(this.isOpen);
  }
}
