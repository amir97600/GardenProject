import { Pipe, PipeTransform } from '@angular/core';
import { Plante } from '../model/plante';

@Pipe({
  name: 'explorerFiltre',
  standalone: false
})
export class ExplorerFiltrePipe implements PipeTransform {

  transform(plantes: Plante[], selectedCategory: string, searchText: string): Plante[] {
    if (!plantes) return [];

    let filtered = plantes;

    if (selectedCategory && selectedCategory !== 'all') {
      filtered = filtered.filter(plante => String(plante.planteType) == selectedCategory);  
    }

    if (searchText && searchText.trim() !== '') {
      filtered = filtered.filter(plante =>
        plante.nom.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    return filtered;
  }

}
