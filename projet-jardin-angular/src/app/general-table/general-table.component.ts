import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { TypePlante } from '../model/type-plante';

@Component({
  selector: 'general-table',
  standalone: false,
  templateUrl: './general-table.component.html',
  styleUrl: './general-table.component.css'
})
export class GeneralTableComponent {

  @Input() data$!: Observable<any[]>;
  @Input() typeLabel: string = 'Élément';
  @Input() searchTerm: string = '';

  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();

  displayedData: any[] = [];
  displayedColumns: string[] = [];
  columnLabels: { [key: string]: string } = {};

  public showConfirmationModal: boolean = false;
  public elementASupprimer: any = null;


  ngOnChanges(): void {
    if (this.data$) {
      this.data$.subscribe(data => {
      
        this.displayedData = this.filterData(data, this.searchTerm);
        if (data.length > 0) {
          this.displayedColumns = Object.keys(data[0]);
  
          // Génère les labels lisibles
          this.columnLabels = {};
          this.displayedColumns.forEach(key => {
            const value = data[0][key];
            let label = this.capitalizeFirstLetter(key);
  
            // Si c'est une liste d'objets, ajoute "_id"
            if (Array.isArray(value) && value.length > 0 && typeof value[0] === 'object') {
              label = this.capitalizeFirstLetter(key) + '_id';
            }
  
            this.columnLabels[key] = label;
          });
        }
      });
    }
  }

  capitalizeFirstLetter(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  filterData(data: any[], term: string): any[] {
    const lowerTerm = term.toLowerCase();
    return data.filter(item =>
      Object.values(item).some(val =>
        String(val ?? '').toLowerCase().includes(lowerTerm)
      )
    );
  }


  formatCell(value: any): string {

    if (Array.isArray(value)) {
      // Cas d'une liste d'objets : on retourne leurs id ou une propriété clé
      return value.map(item => {
        if (typeof item === 'object' && item !== null) {
          return item.id ?? JSON.stringify(item);
        }
        return item;
      }).join(', ');
    }
  
    if (typeof value === 'object' && value !== null) {
      // Cas d'un seul objet
      return value.id ?? JSON.stringify(value);
    }


  
    // Valeur simple
    return value;
  }

  onEdit(item: any): void {
    this.edit.emit(item);
  }

  onDelete(item: any): void {
    this.elementASupprimer = item;
    this.showConfirmationModal = true;
  }

  confirmerSuppression() {
    this.delete.emit(this.elementASupprimer);
    this.showConfirmationModal = false;
    this.elementASupprimer = null;
  }
}
