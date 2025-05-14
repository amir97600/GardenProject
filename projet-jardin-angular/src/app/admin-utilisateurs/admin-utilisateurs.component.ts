import { Component, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, combineLatest, map, Observable, pipe, startWith, switchMap } from 'rxjs';
import { Admin } from '../model/admin';
import { Client } from '../model/client';
import { AdminService } from '../service/admin.service';
import { ClientService } from '../service/client.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Jardin } from '../model/jardin';
import { VilleService } from '../service/ville.service';
import { JardinService } from '../service/jardin.service';
import { AdminUtilisateurService } from '../service/admin-utilisateur.service';
import { ModalFormComponent } from '../modal/modal-form/modal-form.component';

@Component({
  selector: 'admin-utilisateurs',
  standalone: false,
  templateUrl: './admin-utilisateurs.component.html',
  styleUrl: './admin-utilisateurs.component.css'
})
export class AdminUtilisateursComponent implements OnInit{
  filteredAdmins$!: Observable<Admin[]>;
  filteredClients$!: Observable<Client[]>;
  searchTerm: string = '';
  selectedFilter: string  = '';
  private searchTermSubject = new BehaviorSubject<string>('');
  private selectedFilterSubject = new BehaviorSubject<string | null>(null);
  UserProperties = [
    "Id","Login","Mot de passe","Nom","Prenom","Score","Id_jardin","Type d'utilisateur"
  ]
  public clientForm!: FormGroup;
  public client:Client = new Client('','','','',0);
  public adminForm!: FormGroup;
  public admin:Admin = new Admin('','');
  public jardin:Jardin = new Jardin('',5,'Paris');
  public savedJardin!:Observable<Jardin>;
  public savedJardinId: number = 0;
  public showModal: boolean = false;
  public messageError:string = '';
  public boolClient:boolean = false;
  public boolAdmin:boolean = false;
  @ViewChild(ModalFormComponent) modalFormComponent?: ModalFormComponent;

  

  clientFields = [
    { label: 'Nom', name: 'nom', type: 'text' as const, required: true },
    { label: 'Prénom', name: 'prenom', type: 'text' as const, required: true },
    { label: 'Login', name: 'login', type: 'text' as const, required: true },
    { label: 'Nom du jardin', name: 'jardin', type: 'text' as const, required: true },
    { label: 'Code Postal', name: 'codePostal', type: 'codePostal' as const, required: true },
    { label: 'Ville du jardin', name: 'lieu', type: 'select' as const, required: true },
    { label: 'Mot de passe', name: 'password', type: 'password' as const, required: true },
  ];
  
  adminFields = [
    { label: 'Login', name: 'login',type: 'text' as const, required: true },
    { label: 'Mot de passe', name: 'password', type: 'password' as const, required: true }
  ];

  constructor(private adminUtilisateurService : AdminUtilisateurService,private adminService: AdminService,private clientService: ClientService, private formBuilder: FormBuilder, private villeService: VilleService, private serviceJardin: JardinService){}
  ngOnInit(): void {

    this.filteredAdmins$ = combineLatest([
      this.adminService.findAll(),
      this.searchTermSubject.pipe(startWith('')),
      this.selectedFilterSubject.pipe(startWith(null))
    ]).pipe(
      map(([admins, search, filter]) => {
        if (!search) return admins;
        if (!filter) {
          return admins.filter(admin =>
            Object.values(admin).some(value =>
              String(value ?? '').toLowerCase().includes(search.toLowerCase())
            )
          );
        }
        const key = this.getKeyFromProperty(filter);
        if(key === "type_utilisateur" && "admin".includes(search.toLowerCase())){
          return admins;
        }
        return admins.filter((admin: any) =>
          String(admin[key] ?? '').toLowerCase().includes(search.toLowerCase())
        );
      })
    );

    this.filteredClients$ = combineLatest([
      this.clientService.findAll(),
      this.searchTermSubject.pipe(startWith('')),
      this.selectedFilterSubject.pipe(startWith(null))
    ]).pipe(
      map(([clients, search, filter]) => {
        if (!search) return clients;
        if (!filter) {
          return clients.filter(client =>
            Object.values(client).some(value =>
              String(value ?? '').toLowerCase().includes(search.toLowerCase())
            )
          );
        }
        const key = this.getKeyFromProperty(filter);
        if(key === "type_utilisateur" && "client".includes(search.toLowerCase())){
          return clients;
        }
        return clients.filter((client: any) =>
          String(client[key] ?? '').toLowerCase().includes(search.toLowerCase())
        );
      })
    );


    this.clientForm = this.formBuilder.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      login: ['', Validators.required],
      jardin: ['', Validators.required],
      codePostal: ['', Validators.required],
      lieu: ['',Validators.required],
      password: ['', [Validators.required]]
    });

    this.adminForm = this.formBuilder.group({
      login: ['', Validators.required],
      password: ['', [Validators.required]]
    });
    

  }

  onSearch(term: string): void {
    this.searchTerm = term;
    this.searchTermSubject.next(term);
    this.selectedFilterSubject.next(this.selectedFilter);
  }

  selectFilter(property: string): void {
    // Si le filtre est déjà sélectionné, on le désélectionne
    if (this.selectedFilter === property) {
      this.selectedFilter = '';
    } else {
      // Sinon, on sélectionne ce filtre
      this.selectedFilter = property;
    }
  }

  getKeyFromProperty(label: string): string {
    const map: { [key: string]: string } = {
      'Id': 'id',
      'Login': 'login',
      'Mot de passe': 'password',
      'Nom': 'nom',
      'Prenom': 'prenom',
      'Score': 'score',
      'Id_jardin': 'idJardin',
      "Type d'utilisateur": 'type_utilisateur'
    };
    return map[label] || '';
  }

  delete(user:any){
    if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      this.adminService.delete(user).subscribe(() => {
        
        if('score' in user){
          this.serviceJardin.findById(user.idJardin).subscribe((jardin)=>{
            this.serviceJardin.delete(jardin).subscribe(()=> {
              this.serviceJardin.refresh()
              this.clientService.refresh()
            });
          })
          
          
        }
        else{
          this.adminService.refresh();
        }
        
      });
    }
  }

  public setBoolClient(){
    this.boolAdmin = false;
    this.boolClient = true;
  }

  public setBoolAdmin(){
    this.boolClient = false;
    this.boolAdmin = true;
  }

  public openModal(): void {
      this.showModal = true;
    }

    public editClient(user:Client){
      this.client = user;
      this.setBoolClient();
      this.serviceJardin.findById(this.client.idJardin).subscribe(
        (jardin) => {

          this.clientForm.patchValue({
            nom: this.client.nom,
            prenom: this.client.prenom,
            login: this.client.login,
            password: this.client.password,
            jardin: jardin.nom,
            lieu: jardin.lieu
          });

          this.jardin = jardin;
          
          this.openModal();

          this.villeService.getCodePostalByVille(jardin.lieu).subscribe(codePostal => {
            this.clientForm.get('codePostal')?.setValue(codePostal);
            this.modalFormComponent?.onCodePostalChange();
          });
          
        }
      )
    }

    public editAdmin(user:Admin){
      this.admin = user;
      this.setBoolAdmin();

      this.adminForm.patchValue({
        login: this.admin.login,
        password: this.admin.password,
      });

      this.openModal();
    }
    
    public closeModal(): void {
      this.clientForm.reset();
      this.adminForm.reset();
      this.client = new Client('', '', '', '', 0);
      this.admin = new Admin('', '');
      this.jardin = new Jardin('', 5, 'Paris');
      this.boolAdmin = false;
      this.boolClient = false;
      this.showModal = false;
      this.messageError = '';
    }
    
    public onSignupSubmit(): void {
      if (this.clientForm.valid && this.boolClient) {
        this.adminUtilisateurService.saveClient(this.clientForm, this.jardin, this.client,this.savedJardinId);
        this.closeModal();
      }

      if (this.adminForm.valid && this.boolAdmin) {
          this.adminUtilisateurService.saveAdmin(this.admin, this.adminForm)
          this.closeModal();
        }
    }


}
