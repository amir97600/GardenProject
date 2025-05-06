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

      if(event instanceof NavigationEnd){

        //Changement de classe du bofy et activation de la nav
        if (this.previousBackgroundClass) {
          this.renderer.removeClass(document.body, this.previousBackgroundClass);
        }

        if(event.url.includes('admin')){
          this.backgroundClass = 'admin-background';
        }else if(event.url==='/'){
          this.backgroundClass = 'connect-background';
        }
        else{
          this.backgroundClass = 'garden-background';
        }
      }

      this.renderer.addClass(document.body, this.backgroundClass);

      this.previousBackgroundClass = this.backgroundClass;
      
    })

    

  }

  
}
