import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-avatar-selection-modal',
  standalone: false,
  templateUrl: './avatar-selection-modal.component.html',
  styleUrl: './avatar-selection-modal.component.css'
})
export class AvatarSelectionModalComponent {
  @Input() avatars: string[] = [];
  @Input() isOpen: boolean = false;
  @Output() isOpenChange = new EventEmitter<boolean>();
  @Output() onAvatarSelect = new EventEmitter<string>();

  selectAvatar(avatar: string) {
    this.onAvatarSelect.emit(avatar);
    this.isOpen = false;
    this.isOpenChange.emit(this.isOpen);
  }

  fermer() {
    this.isOpen = false;
    this.isOpenChange.emit(this.isOpen);
  }

  ouvrir() {
    this.isOpen = true;
    this.isOpenChange.emit(this.isOpen);
  }

}
