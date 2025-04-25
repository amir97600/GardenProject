import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'garden-navigation',
  standalone: false,
  templateUrl: './garden-navigation.component.html',
  styleUrl: './garden-navigation.component.css'
})
export class GardenNavigationComponent implements OnInit {
  ngOnInit(): void {
      console.log("Bienvenue dans votre jardin")
  }
}
