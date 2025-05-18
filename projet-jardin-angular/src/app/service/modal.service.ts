import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ModalService {
  private showModalSubject = new Subject<void>();
  showModal$ = this.showModalSubject.asObservable();

  triggerModal() {
    this.showModalSubject.next();
  }
}
