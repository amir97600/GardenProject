import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { Error404Component } from './error404/error404.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  backgroundClass = 'garden-background';
  previousBackgroundClass = '';
  navActive = true;
  title = 'projet-jardin-angular';

  constructor(private router:Router, private activatedRoute: ActivatedRoute,private renderer: Renderer2){}

  ngOnInit(): void {
   

    //Afin de savoir sur quel genre d'url on est
    this.router.events.subscribe(event => {

      //Afin de savoir quel component est actif
      let currentRoute = this.activatedRoute.root;
      while (currentRoute.firstChild) {
        currentRoute = currentRoute.firstChild;
      }

      //Afin de savoir quel component est actif
      const component = currentRoute.component;
      
      // Si le composant actif est Page404Component => désactiver la nav
      if (component === Error404Component) {
        this.navActive = false;
      } else {
        this.navActive = true;
      }

      if(event instanceof NavigationEnd){

        //Changement de classe du bofy et activation de la nav
        if (this.previousBackgroundClass) {
          this.renderer.removeClass(document.body, this.previousBackgroundClass);
        }

        if(event.url.includes('admin')){
          this.backgroundClass = 'admin-background';
          this.navActive = true;
        }else if(event.url==='/'){
          this.navActive = false;
          this.backgroundClass = 'connect-background';
        }
        else{
          this.backgroundClass = 'garden-background';
          this.navActive = true;
        }
      }

      this.renderer.addClass(document.body, this.backgroundClass);

      this.previousBackgroundClass = this.backgroundClass;
      
    })

    

  }

  
}
