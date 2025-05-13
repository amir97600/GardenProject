import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'admin-filter-bar',
  standalone: false,
  templateUrl: './admin-filter-bar.component.html',
  styleUrl: './admin-filter-bar.component.css'
})
export class AdminFilterBarComponent {

  @Input() properties: string[] = [];
  @Output() search = new EventEmitter<string>();
  @Output() filterSelect = new EventEmitter<string | null>();

  searchTerm = '';
  selectedFilter: string | null = null;

  onSubmit() {
    this.search.emit(this.searchTerm);
    this.filterSelect.emit(this.selectedFilter);
  }

  selectFilter(property: string) {
    this.selectedFilter = this.selectedFilter === property ? null : property;
    this.onSubmit();
  }

}
