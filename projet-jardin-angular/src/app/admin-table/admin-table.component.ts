import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'admin-table',
  templateUrl: './admin-table.component.html',
  styleUrls: ['./admin-table.component.css']
})
export class AdminTableComponent<T> {
  @Input() items: T[] = [];
  @Input() properties: string[] = [];
  @Input() propertyMap: { [label: string]: string } = {};
  @Output() edit = new EventEmitter<T>();
  @Output() delete = new EventEmitter<T>();

  getKeyFromProperty(label: string): string {
    return this.propertyMap[label] || '';
  }
}

