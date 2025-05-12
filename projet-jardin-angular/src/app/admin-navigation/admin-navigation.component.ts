import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { AdminService } from '../service/admin.service';
import { AuthService } from '../authentification/auth.service';

@Component({
  selector: 'admin-navigation',
  standalone: false,
  templateUrl: './admin-navigation.component.html',
  styleUrl: './admin-navigation.component.css'
})
export class AdminNavigationComponent implements OnInit {
  fil: {label:string , url:string}[] = [];

  baseTitle: string = "Administration ";
  pageTitle: string = "";

  constructor(private router:Router,private service:AdminService, private authService:AuthService){}

  ngOnInit(): void {

    this.generateBreadcrumbs(this.router.url);

    this.setPageTitle();

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.generateBreadcrumbs(event.urlAfterRedirects);
      this.setPageTitle();
    });

  }

  capitalize(str:string):string{
    if(!str){return ''}
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  generateBreadcrumbs(url: string) {
    const parts = url.split('/').filter(part => part); // enlever les vides
    let path = '';
    this.fil = parts.map(part => {
      path += '/' + part;
      return { label: this.capitalize(part), url: path };
    });
  }

  setPageTitle() {
    const currentUrl = this.router.url;
    if (currentUrl.includes('/utilisateur')) {
      this.pageTitle = this.baseTitle + "d'Utilisateur";
    } else if (currentUrl.includes('/culture')) {
      this.pageTitle = this.baseTitle +  'de Culture';
    } else if (currentUrl.includes('/jardin')) {
      this.pageTitle = this.baseTitle +  'de Jardin';
    } else if (currentUrl.includes('/badges_obtenus')) {  
      this.pageTitle = this.baseTitle +  'des Badges';
    } else if (currentUrl.includes('/plante')) {  
      this.pageTitle = this.baseTitle +  'des Plantes';
    } else {
      this.pageTitle = this.baseTitle + 'de Plante & Moi';  // Titre par défaut si aucune page spécifique
    }
  }

  logOut(){
    this.authService.logout();
  }

}
