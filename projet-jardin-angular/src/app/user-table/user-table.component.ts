import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'user-table',
  standalone: false,
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent {
  @Input() userProperties: string[] = [];
  @Input() filteredAdmins!: Observable<any>;
  @Input() filteredClients!: Observable<any>;
  @Input() searchTerm: string = '';

  @Output() editAdmin = new EventEmitter<any>();
  @Output() editClient = new EventEmitter<any>();
  @Output() deleteUser = new EventEmitter<any>();

  displayedDataAdmin: any[] = [];
  displayedDataClient: any[] = [];

  ngOnChanges(): void {
    if (this.filteredAdmins) {
      this.filteredAdmins.subscribe(data => {
      
        this.displayedDataAdmin = this.filterData(data, this.searchTerm);
       
        
      });
    }

    if (this.filteredClients) {
      this.filteredClients.subscribe(data => {
      
        this.displayedDataClient = this.filterData(data, this.searchTerm);
       
        
      });
    }
  }

  filterData(data: any[], term: string): any[] {
    const lowerTerm = term.toLowerCase();
    return data.filter(item =>
      Object.values(item).some(val =>
        String(val ?? '').toLowerCase().includes(lowerTerm)
      )
    );
  }

  emitEditAdmin(user: any) {
    this.editAdmin.emit(user);
  }

  emitEditClient(user: any) {
    this.editClient.emit(user);
  }

  emitDelete(user: any) {
    this.deleteUser.emit(user);
  }
}
