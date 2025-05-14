import { Component } from '@angular/core';
import { MeteoService } from '../service/meteo.service';
import { ClientService } from '../service/client.service';
import { JardinService } from '../service/jardin.service';
import { AuthService } from '../authentification/auth.service';

@Component({
  selector: 'meteo',
  standalone: false,
  templateUrl: './meteo.component.html',
  styleUrl: './meteo.component.css'
})
export class MeteoComponent {
    constructor(private meteoService: MeteoService,
      private clientService: ClientService,
      private authService: AuthService,
      private jardinService: JardinService) {}

  temperature: number | null = null;
  humidite: number | null = null;
  lieuJardin: string | null = null;


// ngOnInit(): void { 
//   this.meteoService.getTemperature('BELLEY').subscribe({
//     next: (data) => {
//       console.log('Réponse complète:', data);
//       console.log('Température:', data[0].t);
//       console.log('Humidité:', data[0].u);
//       this.temperature = Math.round(data[0].t - 273.15);
//       this.humidite = data[0].u;
//     },
//     error: (err) => {
//       console.error('Erreur:', err);
//     }
//   });
// }

ngOnInit(): void {
  const login = this.authService.getLoginFromToken();

  this.clientService.findByLogin(login).subscribe({
    next: (client) => {
      const idJardin = client.idJardin;

      this.jardinService.findById(idJardin).subscribe({
        next: (jardin) => {
          this.lieuJardin = jardin.lieu;
          const ville = jardin.lieu;

          // Appel à la météo avec la ville du jardin
          this.meteoService.getTemperature(ville).subscribe({
            next: (data) => {
              console.log('Réponse complète:', data);
              this.temperature = Math.round(data[0].t - 273.15);
              this.humidite = data[0].u;
            },
            error: (err) => {
              console.error('Erreur météo:', err);
            }
          });
        },
        error: (err) => {
          console.error("Erreur lors de la récupération du jardin :", err);
        }
      });
    },
    error: (err) => {
      console.error("Erreur lors de la récupération du client :", err);
    }
  });
}



}
