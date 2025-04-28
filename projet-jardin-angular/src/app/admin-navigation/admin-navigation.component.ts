import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { AdminService } from '../service/admin.service';

@Component({
  selector: 'admin-navigation',
  standalone: false,
  templateUrl: './admin-navigation.component.html',
  styleUrl: './admin-navigation.component.css'
})
export class AdminNavigationComponent implements OnInit {
  fil: {label:string , url:string}[] = [];

  constructor(private router:Router,private service:AdminService){}

  ngOnInit(): void {

    this.generateBreadcrumbs(this.router.url);

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.generateBreadcrumbs(event.urlAfterRedirects);
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

  logOut(){
    localStorage.removeItem('token');
  }

}
