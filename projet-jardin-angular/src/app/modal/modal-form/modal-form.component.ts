import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'modal-form',
  standalone: false,
  templateUrl: './modal-form.component.html',
  styleUrl: './modal-form.component.css'
})


export class ModalFormComponent {
  @Input() title: string = '';
  @Input() form!: FormGroup;
  @Input() fields: Array<{ label: string, name: string, type?: string, required : boolean ; }> = [];
  @Input() show: boolean = false;

  @Output() close = new EventEmitter<void>();
  @Output() submit = new EventEmitter<void>();

  onSubmit() {
    if (this.form.valid) {
      this.submit.emit();
    } else {
      this.form.markAllAsTouched();
    }
  }
}

