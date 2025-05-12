import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Badge, BadgeDescriptions, BadgeLabels } from '../../model/badge';

@Component({
  selector: 'app-alert-badge-modal',
  standalone: false,
  templateUrl: './alert-badge-modal.component.html',
  styleUrl: './alert-badge-modal.component.css'
})
export class AlertBadgeModalComponent {

  @Input() badge !: Badge;
  @Input() titre!: string;
  @Input() isOpen: boolean = false;

  @Output() isOpenChange = new EventEmitter<boolean>();
  @Output() onConfirm = new EventEmitter();

  ouvrir() {
    this.isOpen = true;
    this.isOpenChange.emit(this.isOpen);
  }

  confirmer() {
    this.onConfirm.emit();
    setTimeout(() => this.fermer(), 1500);
  }

  fermer() {
    this.isOpen = false;
    this.isOpenChange.emit(this.isOpen);
  }

  getBadgeDescription(): string {
    return BadgeDescriptions[this.badge] || "Description indisponible";
  }

  getBadgeName(): string {
    return BadgeLabels[this.badge] || Badge[this.badge];
  }

  getBadgeImageName(): string {
    return `Badge_${Badge[this.badge]}.png`; 
  }


}
