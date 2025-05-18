import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminService } from '../service/admin.service';
import { JardinService } from '../service/jardin.service';
import { ClientService } from '../service/client.service';

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

  public showConfirmationModal: boolean = false;
  public utilisateurASupprimer: any = null;

  constructor(private adminService: AdminService,private serviceJardin: JardinService,private clientService: ClientService){}
  

  ngOnChanges(): void {
    if (this.filteredAdmins) {
      this.filteredAdmins.subscribe(data => {
      
        this.displayedDataAdmin = data;
       
        
      });
    }

    if (this.filteredClients) {
      this.filteredClients.subscribe(data => {
      
        this.displayedDataClient = data;
       
        
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

  ouvrirConfirmationModal(user: any) {
    this.utilisateurASupprimer = user;
    this.showConfirmationModal = true;
  }

  confirmerSuppression() {
    const user = this.utilisateurASupprimer;
    if (!user) return;
  
    
      if ('nom' in user) {
        this.clientService.delete(user).subscribe(()=>{
          
          this.serviceJardin.findById(user.idJardin).subscribe(jardin => {
            this.serviceJardin.delete(jardin).subscribe(() => {
              this.serviceJardin.refresh();
            });
          });

          this.clientService.refresh();
        })
      } else {
        this.adminService .delete(user).subscribe(() => {
          this.adminService.refresh();
        });
      }
    
  
    this.showConfirmationModal = false;
    this.utilisateurASupprimer = null;
  }

  emitEditAdmin(user: any) {
    this.editAdmin.emit(user);
  }

  emitEditClient(user: any) {
    this.editClient.emit(user);
  }

}
