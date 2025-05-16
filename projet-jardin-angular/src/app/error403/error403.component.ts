import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../authentification/auth.service';

@Component({
  selector: 'app-error403',
  standalone: false,
  templateUrl: './error403.component.html',
  styleUrl: './error403.component.css'
})
export class Error403Component {

  public role: string = "";

  constructor(private router: Router, private authService: AuthService){
     this.role = sessionStorage.getItem('role') || '';
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
