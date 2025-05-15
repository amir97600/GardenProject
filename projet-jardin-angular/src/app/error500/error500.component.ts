import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../authentification/auth.service';

@Component({
  selector: 'error500',
  standalone: false,
  templateUrl: './error500.component.html',
  styleUrl: './error500.component.css'
})
export class Error500Component {
    public role: string = "";
  
    constructor(private router: Router, private authService: AuthService){
       this.role = localStorage.getItem('role') || '';
       console.log(this.role)
    }
  
    onClickHome() {
       if (this.role === 'ROLE_ADMIN') {
        this.router.navigate(['/home-admin']);
      } else {
        this.router.navigate(['/home']);
      }
    }
      
  
}
