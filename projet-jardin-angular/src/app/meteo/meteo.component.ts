import { Component } from '@angular/core';
import { MeteoService } from '../service/meteo.service';

@Component({
  selector: 'meteo',
  standalone: false,
  templateUrl: './meteo.component.html',
  styleUrl: './meteo.component.css'
})
export class MeteoComponent {
    constructor(private meteoService: MeteoService) {}

  temperature: number | null = null;

ngOnInit(): void {
  this.meteoService.getTemperature().subscribe({
    next: (data) => {
      console.log('Réponse complète:', data);
      console.log('Température:', data[0].t);
      this.temperature = Math.round(data[0].t - 273.15);
    },
    error: (err) => {
      console.error('Erreur:', err);
    }
  });
}


}
