import { Component, OnInit, Renderer2 } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

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

  constructor(private router:Router,private renderer: Renderer2){}

  ngOnInit(): void {

    this.router.events.subscribe(event => {

      if(event instanceof NavigationEnd){

        if (this.previousBackgroundClass) {
          this.renderer.removeClass(document.body, this.previousBackgroundClass);
        }

        if(event.url.includes('admin')){
          this.backgroundClass = 'admin-background';
          this.navActive = true;
        }else if(event.url.includes('connexion')){
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
