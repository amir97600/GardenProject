import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../authentification/auth.service';
import { AuthRequest } from '../authentification/auth-request';
import { catchError, Observable, of, Subscription, switchMap } from 'rxjs';
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

export class ConnexionComponent {

  public authForm!: FormGroup;
  public showModal: boolean = false;
  public loginCtrl!: FormControl;
  public passwordCtrl!: FormControl;
  public messageError:string = '';


  

  constructor(private service: AuthService, private adminUtilisateurService : AdminUtilisateurService, private serviceClient: ClientService, private serviceJardin: JardinService, private villeService:VilleService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.loginCtrl = this.formBuilder.control('', Validators.required);
    this.passwordCtrl = this.formBuilder.control('', [ Validators.required ]);

    this.authForm = this.formBuilder.group({
      login: this.loginCtrl,
      password: this.passwordCtrl
    });
    
  }

  

  public authenticate() {
    this.service.authenticate(new AuthRequest(this.authForm.value.login, this.authForm.value.password))
    .pipe(
      switchMap((resp) => {
        this.service.token = resp.token;
        this.service.role = resp.role;
        sessionStorage.setItem('token', resp.token);
        sessionStorage.setItem('role',resp.role);
        //Si l'utilisateur est un admin, on le renvoit vers la page des admins
        if(this.service.role === 'ROLE_ADMIN'){
          return this.router.navigate(['/home-admin']); 
        }
        //Sinon c'est un Client et il ira vers la page client
        else{
          return this.router.navigate(['/home']); 
        }
        
      }),
      catchError((error) => {
        if (error.status === 403) {
          this.messageError = "Accès refusé : identifiants incorrects."
          
          
        } else {
          this.messageError = "Erreur de connexion. Veuillez réessayer."
         
        }
        return of(null);
      })

      
    )
    .subscribe();
    
  }

  showError(controlName: string, error: string): boolean | undefined {
    const control = this.authForm.get(controlName);
    return control?.hasError(error) && (control?.touched || control?.dirty);
  }

  public openModal(): void {
    this.showModal = true;
  }
  
  public closeModal(): void {
    this.showModal = false;
  }
  
  


}