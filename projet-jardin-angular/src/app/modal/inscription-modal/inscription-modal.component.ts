import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { VilleService } from '../../service/ville.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Client } from '../../model/client';
import { Jardin } from '../../model/jardin';
import { Observable, Subscription } from 'rxjs';
import { JardinService } from '../../service/jardin.service';
import { AdminUtilisateurService } from '../../service/admin-utilisateur.service';
import { ClientService } from '../../service/client.service';

@Component({
  selector: 'inscription-modal',
  standalone: false,
  templateUrl: './inscription-modal.component.html',
  styleUrl: './inscription-modal.component.css'
})
export class InscriptionModalComponent implements OnInit,OnDestroy {

  @Input() titre!: string;
  @Input() isOpen: boolean = false;
  isCodePostal:boolean = false;

  @Output() isOpenChange = new EventEmitter<boolean>();

  signupForm!:FormGroup;
  public messageVilleError:string = '';
  public client:Client = new Client('','','','',0,'');
  public jardin:Jardin = new Jardin('','Paris');
  public savedJardin!:Observable<Jardin>;
  public savedJardinId: number = 0;
  public codePostalValue = '';
  private codePostalSubscription!: Subscription;

  ville: string = '';
  villes: string[] = [];

  constructor(private adminUtilisateurService : AdminUtilisateurService, private serviceClient: ClientService, private serviceJardin: JardinService, private villeService:VilleService, private formBuilder: FormBuilder) { }
  
  ngOnInit(): void {
    
    this.signupForm = this.formBuilder.group({
          nom: ['', Validators.required],
          prenom: ['', Validators.required],
          login: ['', Validators.required],
          jardin: ['', Validators.required],
          codePostal: ['',Validators.required],
          lieu: ['',Validators.required],
          password: ['', [Validators.required, Validators.minLength(6)]]
        });
    
       

  }

  ouvrir() {
    this.isOpen = true;
    this.isOpenChange.emit(this.isOpen);
  }

  chargerVilles() {
    if (!this.signupForm.get('codePostal')?.value || this.signupForm.get('codePostal')?.value.trim().length < 4) {
      this.villes = [];
      return;
    }

    this.codePostalSubscription = this.villeService.getVilleByCodePostal(this.signupForm.get('codePostal')?.value).subscribe({
      next: (villes: string[]) => {
        this.villes = villes;
        this.ville = villes.length > 0 ? villes[0] : '';
        this.signupForm.get('lieu')?.setValue(this.ville);
        this.isCodePostal = true;
        this.confirmer();
      },
      error: () => {
        this.messageVilleError = "Erreur lors du chargement des villes.";
        this.villes = [];
        this.confirmer();
      }
    });

    
  }

  confirmer() {
    this.messageVilleError = '';

    if (!this.signupForm.get('codePostal')?.value || this.signupForm.get('codePostal')?.value.trim() === '') {
      this.messageVilleError = "Le code postal est vide !";
      return;
    }

    if (!this.signupForm.get('lieu')?.value) {
      this.messageVilleError = "Aucune ville sélectionnée !";
      return;
    }

  }

  fermer() {
    this.isOpen = false;
    this.isOpenChange.emit(this.isOpen);
    this.reset();
  }

  reset() {
    this.codePostalValue = '';
    this.villes = [];
    this.messageVilleError = '';
    this.signupForm.reset();
    this.isCodePostal = false;
  }

  public onSignupSubmit(): void {
    
    if (this.signupForm.valid) {
      this.adminUtilisateurService.saveClient(this.signupForm,this.jardin,this.client,this.savedJardinId)
    }

    this.reset();

    this.fermer();
    
  }

  ngOnDestroy(): void {
   
    if (this.codePostalSubscription) {
      this.codePostalSubscription.unsubscribe();
    }
     
  }

}
