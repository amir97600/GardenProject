import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../service/database.service';
import { map, Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../authentification/auth.service';
import { AdminService } from '../service/admin.service';
import { Admin } from '../model/admin';
import { ModalService } from '../service/modal.service';
import { Router } from '@angular/router';

export type LucideIconNode = [elementName: string, attrs: Record<string, string>];

export interface LucideIconData {
  name: string;
  iconNode: readonly LucideIconNode[];
}



@Component({
  selector: 'home-admin',
  standalone: false,
  templateUrl: './home-admin.component.html',
  styleUrl: './home-admin.component.css'
})
export class HomeAdminComponent implements OnInit{


  public customCirclePlus: LucideIconData = {
    name: 'custom-circle-plus',
    iconNode: [
      ['circle', { cx: '12', cy: '12', r: '10', stroke: '#2D4739' }],
      ['line', { x1: '12', y1: '8', x2: '12', y2: '16', stroke: 'white' }],
      ['line', { x1: '8', y1: '12', x2: '16', y2: '12', stroke: 'white' }],
    ],
  };

  public tables!:Observable<String[]>;
  public adminForm!: FormGroup;
  public admin:Admin = new Admin('','');
  public adminFields = [
    { label: 'Login', name: 'login', type: 'text' as const, required: true },
    { label: 'Password', name: 'password', type: 'password' as const, required: true },
  ];  
  public showModal:boolean = false;
  public successMessage = '';

  constructor(private databaseService:DatabaseService, private formBuilder: FormBuilder, private router: Router, private authService: AuthService, private adminService: AdminService, private modalService: ModalService ){}

  ngOnInit(): void {
    this.tables = this.databaseService.getTables().pipe(
      map((tableNames: String[]) => 
        tableNames
          .filter(name => name !== 'badges_obtenus')  // Exclure "badges_obtenus"
          .map(name => name.charAt(0).toUpperCase() + name.slice(1))  // Capitaliser les autres noms
      )
      
    );

    this.adminForm = this.formBuilder.group({
      login: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.modalService.showModal$.subscribe(() => {
      this.openModal();
    });
  }

  public findAdminAccount(){


    if(!this.admin.id){
      let login = this.authService.getLoginFromToken();


      this.adminService.findByLogin(login).subscribe(
        (admin)=>{
          this.adminForm.get('login')?.setValue(admin.login);
          this.adminForm.get('password')?.setValue(admin.password);
          this.admin = admin;
        }
      )

    }
    else{
      this.adminForm.get('login')?.setValue(this.admin.login);
      this.adminForm.get('password')?.setValue(this.admin.password);
    }

    
      
  }

  public openModal(): void {
  
    this.findAdminAccount();
    this.showModal = true;
  }

  public closeModal(): void {
      this.adminForm.reset();
      this.showModal = false;
  }
          
  public onSignupSubmit(): void {
    if (this.adminForm.valid) {
      
      let oldLogin = this.admin.login;
      let oldPassword = this.admin.password;
      this.admin.login = this.adminForm.get('login')?.value;
      this.admin.password = this.adminForm.get('password')?.value

      this.adminService.save(this.admin).subscribe()

      if (this.admin.login !== oldLogin || this.admin.password !== oldPassword) {
        this.closeModal();
        this.successMessage = 'Paramètres modifiés avec succès !\n\nVeuillez vous reconnecter 🎉';
      
        setTimeout(() => {
          this.successMessage = '';
          sessionStorage.removeItem('token');
          this.router.navigate(['']);
        }, 3000);
      
        // Garde le message jusqu’à la redirection
      } else {
        this.closeModal();
        this.successMessage = "Paramètres modifiés avec succès !\n\nMême si vous n'avez rien modifié !";
        setTimeout(() => {
          this.successMessage = '';
        },2000);
      }

     
      
    }
  }
  



}
