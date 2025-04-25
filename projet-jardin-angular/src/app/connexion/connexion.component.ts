import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../authentification/auth.service';
import { AuthRequest } from '../authentification/auth-request';

@Component({
  selector: 'app-connexion',
  standalone: false,
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})

export class ConnexionComponent implements OnInit {
  public authForm!: FormGroup;
  public loginCtrl!: FormControl;
  public passwordCtrl!: FormControl;
  public messageError:string = '';

  constructor(private service: AuthService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.loginCtrl = this.formBuilder.control('Entrez le login', Validators.required);
    this.passwordCtrl = this.formBuilder.control('Entrez le mot de passe', [ Validators.required, Validators.minLength(6) ]);

    this.authForm = this.formBuilder.group({
      login: this.loginCtrl,
      password: this.passwordCtrl
    });
  }

  public authenticate() {
    this.service.authenticate(new AuthRequest(this.authForm.value.login, this.authForm.value.password));

    if(this.service.token){
      this.router.navigate([ '/admin' ]);
    }
    else{
      this.messageError= "Erreur de connexion!";
    }
    
  }
}
