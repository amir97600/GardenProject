import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-client',
  standalone: false,
  templateUrl: './home-client.component.html',
  styleUrl: './home-client.component.css'
})
export class HomeClientComponent {

  constructor(private router: Router) { }

}
