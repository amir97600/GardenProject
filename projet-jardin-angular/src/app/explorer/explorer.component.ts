import { Component } from '@angular/core';
import { Plante } from '../model/plante';
import { PlanteService } from '../service/plante.service';

@Component({
  selector: 'explorer',
  standalone: false,
  templateUrl: './explorer.component.html',
  styleUrl: './explorer.component.css'
})
export class ExplorerComponent {

  selectedCategory: string = 'all';
  searchText: string = '';


  plantes: Plante[] = [];

  constructor(private planteService: PlanteService) { }

  ngOnInit(): void {
    this.planteService.findAll().subscribe({
      next: (data) => this.plantes = data,
      error: (err) => console.error('Erreur lors du chargement des plantes :', err)
    });
  }

}
