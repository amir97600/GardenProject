import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { forkJoin, map, Observable, switchMap, tap, throwError } from 'rxjs';
import { environment } from '../environment/environment';
import { secret } from '../environment/secret';

interface Station {
  Id_station: string;
  Ville: string;
}

@Injectable({
  providedIn: 'root'
})
export class MeteoService {
  private stationsUrl = 'station.json';
  private apiKey = secret.apiKey;

  constructor(private http: HttpClient) {}

  getStations(): Observable<Station[]> {
    return this.http.get<Station[]>(this.stationsUrl);
  }

  findByVille(ville: string): Observable<string | null> {
    return this.getStations().pipe(
      map(stations => {
        const station = stations.find(s => s.Ville.toLowerCase() === ville.toLowerCase());
        return station ? station.Id_station : null;
      })
    );
  }

  getTemperature(ville: string): Observable<any> {
    return this.findByVille(ville).pipe(
      switchMap(idStation => {
        if (!idStation) {
          return throwError(() => new Error('Station non trouvée'));
        }
        const url = `api/public/DPObs/v1/station/infrahoraire-6m/?id_station=${idStation}&format=json`;
        const headers = new HttpHeaders({
          'accept': '*/*',
          'apikey': this.apiKey,
        });

        console.log(headers) 
         return this.http.get<any>(url, { headers }).pipe(
          tap(response => console.log('Réponse API complète:', response))
        );
      })
    );
  }

  getDirectionVent(dd: number): string {
    dd = dd % 360;
    if (dd < 0) dd += 360;

    if (dd >= 337.5 || dd < 22.5) return "Nord";
    else if (dd >= 22.5 && dd < 67.5) return "Nord-Est";
    else if (dd >= 67.5 && dd < 112.5) return "Est";
    else if (dd >= 112.5 && dd < 157.5) return "Sud-Est";
    else if (dd >= 157.5 && dd < 202.5) return "Sud";
    else if (dd >= 202.5 && dd < 247.5) return "Sud-Ouest";
    else if (dd >= 247.5 && dd < 292.5) return "Ouest";
    else return "Nord-Ouest";
}

getConditionMeteo(t: number, u: number, ff: number): string {
  let condition = '';

  if (t < 0) {
    condition += 'Il fait très froid ❄️, ';
  } else if (t >= 0 && t <= 10) {
    condition += 'Il fait froid 🧣, ';
  } else if (t > 10 && t <= 25) {
    condition += 'Il fait bon 🌤️, ';
  } else {
    condition += 'Il fait chaud ☀️, ';
  }

  // Humidité
  if (u < 30) {
    condition += 'l’humidité est faible 💧, ';
  } else if (u >= 30 && u <= 70) {
    condition += 'l’humidité est moyenne 💧, ';
  } else {
    condition += 'l’humidité est élevée 🌫️, ';
  }

  // Vitesse du vent
  if (ff < 10) {
    condition += 'et le vent est calme 🌬️.';
  } else if (ff >= 10 && ff <= 30) {
    condition += 'et le vent est modéré 🌬️.';
  } else {
    condition += 'et le vent est fort 💨.';
  }

  return condition;
}

lunePhase(): string {
    // Date de la dernière nouvelle lune (6 janvier 2000)
    const dateReference = new Date(2000, 0, 6);
    
    const dateActuelle = new Date();
    
    const joursEcoules = (dateActuelle.getTime() - dateReference.getTime()) / (1000 * 3600 * 24);
    
    const cycleLunaire = 29.53;
    
    const phase = (joursEcoules % cycleLunaire) / cycleLunaire;
    
    if (phase < 0.03) {
        return "🌑 Nouvelle lune";
    } else if (phase < 0.25) {
        return "🌒 Premier quartier croissant";
    } else if (phase < 0.50) {
        return "🌓 Pleine lune";
    } else if (phase < 0.75) {
        return "🌔 Dernier quartier décroissant";
    } else {
        return "🌑 Nouvelle lune";
    }
}

getPluie(ville: string): Observable<number[]> {
  return this.findByVille(ville).pipe(
    switchMap(idStation => {
      if (!idStation) {
        return throwError(() => new Error('Station non trouvée'));
      }

      // Récupération de l'heure actuelle et génération des plages horaires
      const heures = [0, 2, 4, 6, 8, 10]; // Décalages horaires
      const now = new Date();
      const dateFormats = heures.map(h => {
      const date = new Date(now.getTime() - h * 60 * 60 * 1000);
      date.setUTCMinutes(0, 0, 0); // Met à zéro les minutes, secondes, millisecondes
      return date.toISOString().split('.')[0] + 'Z'; // Résultat : 2025-05-15T06:00:00Z
      });



      const headers = new HttpHeaders({
        'accept': '*/*',
        'apikey': this.apiKey
      });

      // Effectuer toutes les requêtes pour chaque plage horaire
      return forkJoin(
        dateFormats.map(date =>
          this.http.get<any>(`${environment.arrossage}?id_station=${idStation}&date=${date}&format=json`, { headers })
        )
      ).pipe(
        map(responses => responses.map(response => response?.[0]?.rr1 ?? null)), // Extraction des valeurs rr1
        tap(rr1Values => console.log('Indices rr1:', rr1Values)) // Debugging
      );
    })
  );
}


}
