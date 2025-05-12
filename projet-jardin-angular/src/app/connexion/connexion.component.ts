import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../authentification/auth.service';
import { AuthRequest } from '../authentification/auth-request';
import { catchError, Observable, of, Subscription, switchMap } from 'rxjs';
import { Client } from '../model/client';
import { Jardin } from '../model/jardin';
import { ClientService } from '../service/client.service';
import { JardinService } from '../service/jardin.service';
import { VilleService } from '../service/ville.service';
import { AdminUtilisateurService } from '../service/admin-utilisateur.service';

@Component({
  selector: 'app-connexion',
  standalone: false,
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})

export class ConnexionComponent implements OnInit,OnDestroy {
  public authForm!: FormGroup;
  public showModal: boolean = false;
  public signupForm!: FormGroup;
  public loginCtrl!: FormControl;
  public passwordCtrl!: FormControl;
  public messageError:string = '';
  public messageVilleError:string = '';
  public client:Client = new Client('','','','',0);
  public jardin:Jardin = new Jardin('',5,'Paris');
  public savedJardin!:Observable<Jardin>;
  public savedJardinId: number = 0;
  public codePostalValue = '';
  private codePostalSubscription!: Subscription;


  

  constructor(private service: AuthService, private adminUtilisateurService : AdminUtilisateurService, private serviceClient: ClientService, private serviceJardin: JardinService, private villeService:VilleService, private router: Router, private formBuilder: FormBuilder) { }

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
      codePostal: ['',Validators.required],
      lieu: ['Entrez le code postal de la ville',Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.signupForm.get('lieu')?.disable();

    this.codePostalSubscription = this.signupForm.get('codePostal')?.valueChanges.subscribe(value => {
      if (value.length >= 5) {
        this.getVille(value);
      }
    })!;
    
  }

  ngOnDestroy(): void {
    if (this.codePostalSubscription) {
      this.codePostalSubscription.unsubscribe();
    }
  }

  public authenticate() {
    this.service.authenticate(new AuthRequest(this.authForm.value.login, this.authForm.value.password))
    .pipe(
      switchMap((resp) => {
        this.service.token = resp.token;
        this.service.role = resp.role;
        localStorage.setItem('token', resp.token);
        localStorage.setItem('role',resp.role);
        //Si l'utilisateur est un admin, on le renvoit vers la page des admins
        if(this.service.role === 'ROLE_ADMIN'){
          return this.router.navigate(['/home-admin']); 
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
      this.adminUtilisateurService.saveClient(this.signupForm,this.jardin,this.client,this.savedJardinId)
    }
    this.closeModal();
  }

  public getVille(codePostal: string): void {
    this.adminUtilisateurService.getVille(codePostal,this.signupForm,this.messageVilleError)
  }


}