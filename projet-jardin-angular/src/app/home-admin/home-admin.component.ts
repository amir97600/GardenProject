import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../service/database.service';
import { map, Observable } from 'rxjs';

export type LucideIconNode = [elementName: string, attrs: Record<string, string>];

export interface LucideIconData {
  name: string;
  iconNode: readonly LucideIconNode[];
}


@Component({
  selector: 'home-admin',
  standalone: false,
  templateUrl: './home-admin.component.html',
  styleUrl: './home-admin.component.css'
})
export class HomeAdminComponent implements OnInit{


  public customCirclePlus: LucideIconData = {
    name: 'custom-circle-plus',
    iconNode: [
      ['circle', { cx: '12', cy: '12', r: '10', stroke: '#2D4739' }],
      ['line', { x1: '12', y1: '8', x2: '12', y2: '16', stroke: 'white' }],
      ['line', { x1: '8', y1: '12', x2: '16', y2: '12', stroke: 'white' }],
    ],
  };

  public tables!:Observable<String[]>;

  constructor(private databaseService:DatabaseService ){}

  ngOnInit(): void {
    this.tables = this.databaseService.getTables().pipe(
      map((tableNames: String[]) =>
        tableNames.map(name => name.charAt(0).toUpperCase() + name.slice(1))
      ));
  }



}
