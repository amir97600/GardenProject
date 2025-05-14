import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'admin-filter',
  standalone: false,
  templateUrl: './admin-filter.component.html',
  styleUrl: './admin-filter.component.css'
})
export class AdminFilterComponent {
  @Input() properties: string[] = [];
  @Input() selectedFilter: string = '';
  @Output() filterSelected = new EventEmitter<string>();

  selectFilter(property: string ): void {
    this.filterSelected.emit(property);
  }
}
