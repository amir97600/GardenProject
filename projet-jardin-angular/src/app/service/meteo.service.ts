import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
import { environment } from '../environment/environment';

interface Station {
  Id_station: string;
  Ville: string;
}

@Injectable({
  providedIn: 'root'
})
export class MeteoService {
  idStation = "01014002"; 

  private stationsUrl = 'station.json';

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
  
  private url = `${environment.meteoBaseUrl}?id_station=${this.idStation}&format=json`;
  private apiKey = 'eyJ4NXQiOiJZV0kxTTJZNE1qWTNOemsyTkRZeU5XTTRPV014TXpjek1UVmhNbU14T1RSa09ETXlOVEE0Tnc9PSIsImtpZCI6ImdhdGV3YXlfY2VydGlmaWNhdGVfYWxpYXMiLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJhbnRvaW5lZjAzQGNhcmJvbi5zdXBlciIsImFwcGxpY2F0aW9uIjp7Im93bmVyIjoiYW50b2luZWYwMyIsInRpZXJRdW90YVR5cGUiOm51bGwsInRpZXIiOiJVbmxpbWl0ZWQiLCJuYW1lIjoiRGVmYXVsdEFwcGxpY2F0aW9uIiwiaWQiOjI3ODM0LCJ1dWlkIjoiZjk0MWRhYmYtMGI3Zi00OTcwLTk1OWItOGQ2NjkwMTg1ZThlIn0sImlzcyI6Imh0dHBzOlwvXC9wb3J0YWlsLWFwaS5tZXRlb2ZyYW5jZS5mcjo0NDNcL29hdXRoMlwvdG9rZW4iLCJ0aWVySW5mbyI6eyI1MFBlck1pbiI6eyJ0aWVyUXVvdGFUeXBlIjoicmVxdWVzdENvdW50IiwiZ3JhcGhRTE1heENvbXBsZXhpdHkiOjAsImdyYXBoUUxNYXhEZXB0aCI6MCwic3RvcE9uUXVvdGFSZWFjaCI6dHJ1ZSwic3Bpa2VBcnJlc3RMaW1pdCI6MCwic3Bpa2VBcnJlc3RVbml0Ijoic2VjIn19LCJrZXl0eXBlIjoiUFJPRFVDVElPTiIsInN1YnNjcmliZWRBUElzIjpbeyJzdWJzY3JpYmVyVGVuYW50RG9tYWluIjoiY2FyYm9uLnN1cGVyIiwibmFtZSI6IkRvbm5lZXNQdWJsaXF1ZXNPYnNlcnZhdGlvbiIsImNvbnRleHQiOiJcL3B1YmxpY1wvRFBPYnNcL3YxIiwicHVibGlzaGVyIjoiYmFzdGllbmciLCJ2ZXJzaW9uIjoidjEiLCJzdWJzY3JpcHRpb25UaWVyIjoiNTBQZXJNaW4ifV0sImV4cCI6MTc0NzE1MjEyOSwidG9rZW5fdHlwZSI6ImFwaUtleSIsImlhdCI6MTc0NzE0MjEyOSwianRpIjoiYmFiOGI3OTMtYzc5Yi00NTMyLTllOWMtMWYwZTQ2NmU3ZmRjIn0=.v-Y0c9q5M2R7XcZ55Lh9fkV6dwQe_s532_s-gzpL3jT91Qg6hDjEd-kE3ep4Qhv-kbSajmEWUDsZmQreooMHWkcp5igU-j0lqDH7JnnhnQe-54hiBnuHIgr8ioJskuot7PxSYNCfkrZL-S1uqLQlfFu0DwDXkHUQ_zmDSpNjeSgSOqX5oBSY8WLaXv1svm17tt8L80YNGa415vYripD_8lc2fxDVu0_bbsWPasT3puSHBnslyekpEIq0LgaNmFduB2J6IfDA5DpuZpo8pNYmuVOd8TIbKt0tE6BTZCHhTeCT2RbEQRPyvNnMo5LdkUny29-F2aCwptqbGl9UVJl2hg=='; // Remplace par ta clé API

  constructor(private http: HttpClient) {}

getTemperature(): Observable<any> {
  const headers = new HttpHeaders({
    'accept': '*/*',
    'apikey': this.apiKey
  });

  return this.http.get<any>(this.url, { headers }).pipe(
    tap(response => console.log('Réponse API complète:', response)) // Affichage dans la console
  );
}

  // getTemperature(ville: string): Observable<any> {
  //   return this.findByVille(ville).pipe(
  //     tap(id => {
  //       if (id) {
  //         this.idStation = id;
  //       } else {
  //         throw new Error('Station introuvable pour la ville : ' + ville);
  //       }
  //     }),
  //     map(() => {
  //       const url = `${environment.meteoBaseUrl}?id_station=${this.idStation}&format=json`;
  //       const headers = new HttpHeaders({
  //         'accept': '*/*',
  //         'apikey': 'TA_CLE_API_ICI' // 🔐 Remplace par ta clé API
  //       });
  //       return this.http.get<any>(url, { headers });
  //     }),
  //     tap(response => console.log('Réponse API météo:', response))
  //   );
  // }
}
