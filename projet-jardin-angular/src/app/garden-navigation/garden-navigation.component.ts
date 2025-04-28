import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'garden-navigation',
  standalone: false,
  templateUrl: './garden-navigation.component.html',
  styleUrls: ['./garden-navigation.component.css']  // Correction ici
})
export class GardenNavigationComponent implements OnInit {

  pageTitle: string = "Accueil";  // Titre par défaut

  constructor(private router: Router) { }

  ngOnInit(): void {
      console.log("Bienvenue dans votre jardin");

      // Mettre à jour le titre dès le départ
      this.setPageTitle();

      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd)
      ).subscribe(() => {
        this.setPageTitle();
      });
  }

  setPageTitle() {
    const currentUrl = this.router.url;
    if (currentUrl.includes('/profil')) {
      this.pageTitle = 'Mon Profil';
    } else if (currentUrl.includes('/mes-cultures')) {
      this.pageTitle = 'Mes Cultures';
    } else if (currentUrl.includes('/explorer')) {  // Si tu as une page "Explorer"
      this.pageTitle = 'Explorer';
    } else {
      this.pageTitle = 'Accueil';  // Titre par défaut si aucune page spécifique
    }
  }

  logOut(){
    localStorage.removeItem('token');
  }

}
