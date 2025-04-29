import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../authentification/auth.service';
import { AuthRequest } from '../authentification/auth-request';
import { catchError, Observable, of, switchMap } from 'rxjs';
import { Client } from '../model/client';
import { Jardin } from '../model/jardin';
import { ClientService } from '../service/client.service';
import { JardinService } from '../service/jardin.service';

@Component({
  selector: 'app-connexion',
  standalone: false,
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})

export class ConnexionComponent implements OnInit {
  public authForm!: FormGroup;
  public showModal: boolean = false;
  public signupForm!: FormGroup;
  public loginCtrl!: FormControl;
  public passwordCtrl!: FormControl;
  public messageError:string = '';
  public client:Client = new Client('','','','',0);
  public jardin:Jardin = new Jardin('',5,'Paris');
  public savedJardin!:Observable<Jardin>;
  public savedJardinId: number = 0;

  constructor(private service: AuthService, private serviceClient: ClientService, private serviceJardin: JardinService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.loginCtrl = this.formBuilder.control('', Validators.required);
    this.passwordCtrl = this.formBuilder.control('', [ Validators.required ]);

    this.authForm = this.formBuilder.group({
      login: this.loginCtrl,
      password: this.passwordCtrl
    });

    this.signupForm = this.formBuilder.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      login: ['', Validators.required],
      jardin: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  public authenticate() {
    this.service.authenticate(new AuthRequest(this.authForm.value.login, this.authForm.value.password))
    .pipe(
      switchMap((resp) => {
        this.service.token = resp.token;
        this.service.role = resp.role;
        localStorage.setItem('token', resp.token);
        //Si l'utilisateur est un admin, on le renvoit vers la page des admins
        if(this.service.role === 'ROLE_ADMIN'){
          return this.router.navigate(['/admin']); 
        }
        //Sinon c'est un Client et il ira vers la page client
        else{
          return this.router.navigate(['/profil']); 
        }
        
      }),
      catchError((error) => {
        this.messageError = "Erreur de connexion !";
        return of(null);
      })
    )
    .subscribe();
    
  }

  public openModal(): void {
    this.showModal = true;
  }
  
  public closeModal(): void {
    this.showModal = false;
  }
  
  public onSignupSubmit(): void {
    if (this.signupForm.valid) {
      
      this.jardin.nom = this.signupForm.value.jardin;

      this.serviceJardin.save(this.jardin).pipe(
        switchMap(() => this.serviceJardin.findByNom(this.jardin.nom)),
        switchMap((jardin) => {
          this.client.nom = this.signupForm.value.nom;
          this.client.prenom = this.signupForm.value.prenom;
          this.client.login = this.signupForm.value.login;
          this.client.password = this.signupForm.value.password;
          this.client.idJardin = jardin.numero;
          return this.serviceClient.save(this.client);
        })
      ).subscribe(() => {
        this.client = new Client('', '', '', '', 0);
        this.jardin = new Jardin('', 5,'Paris');
        this.savedJardinId = 0;
        this.closeModal();
      });
    }
  }

}