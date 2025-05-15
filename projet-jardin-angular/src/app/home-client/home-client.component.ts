import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MeteoService } from '../service/meteo.service';
import { ClientService } from '../service/client.service';
import { AuthService } from '../authentification/auth.service';
import { JardinService } from '../service/jardin.service';

@Component({
  selector: 'client',
  standalone: false,
  templateUrl: './home-client.component.html',
  styleUrl: './home-client.component.css'
})
export class HomeClientComponent {

  constructor(private router: Router,
    private meteoService: MeteoService,
    private clientService: ClientService,
    private authService: AuthService,
    private jardinService: JardinService) {}

  
  temperature: number | null = null;
  humidite: number | null = null;
  vent: number | null = null;
  dd: number | null = null;
  lieuJardin: string | null = null;
  directionVent: string | null = null;
  condition: string | null = null;
  lune: string | null = null;
  
  ngOnInit(): void {
  const login = this.authService.getLoginFromToken();

  this.clientService.findByLogin(login).subscribe({
    next: (client) => {
      const idJardin = client.idJardin;

      this.jardinService.findById(idJardin).subscribe({
        next: (jardin) => {
          this.lieuJardin = jardin.lieu;
          const ville = jardin.lieu;

          this.meteoService.getTemperature(ville).subscribe({
            next: (data) => {
              console.log('Réponse complète:', data);
              this.temperature = Math.round(data[0].t - 273.15);
              this.humidite = data[0].u;
              this.vent = Math.round(data[0].ff * 3.6);
              this.dd = data[0].dd;
              this.directionVent = this.meteoService.getDirectionVent(this.dd ?? 0);
              this.condition = this.meteoService.getConditionMeteo(
                this.temperature ?? 0,
                this.humidite ?? 0,
                this.vent ?? 0
              );
              this.lune = this.meteoService.lunePhase();
            },
            error: (err) => {
              console.error('Erreur météo:', err);
              // Fallback sur Paris
              this.meteoService.getTemperature("Paris").subscribe({
                next: (data) => {
                  console.log('Réponse complète (Paris):', data);
                  this.temperature = Math.round(data[0].t - 273.15);
                  this.humidite = data[0].u;
                  this.vent = Math.round(data[0].ff * 3.6);
                  this.dd = data[0].dd;
                  this.directionVent = this.meteoService.getDirectionVent(this.dd ?? 0);
                  this.condition = this.meteoService.getConditionMeteo(
                    this.temperature ?? 0,
                    this.humidite ?? 0,
                    this.vent ?? 0
                  );
                  this.lune = this.meteoService.lunePhase();
                },
                error: (errParis) => {
                  console.error('Erreur météo pour Paris également :', errParis);
                }
              });
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
