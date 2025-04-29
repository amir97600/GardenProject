import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../service/database.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'home-admin',
  standalone: false,
  templateUrl: './home-admin.component.html',
  styleUrl: './home-admin.component.css'
})
export class HomeAdminComponent implements OnInit{
  public tables!:Observable<String[]>;

  constructor(private databaseService:DatabaseService ){}

  ngOnInit(): void {
    this.tables = this.databaseService.getTables();
  }



}
