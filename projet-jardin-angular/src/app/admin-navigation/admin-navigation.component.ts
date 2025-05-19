import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Observable } from 'rxjs';
import { AdminService } from '../service/admin.service';
import { AuthService } from '../authentification/auth.service';
import { ModalService } from '../service/modal.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Admin } from '../model/admin';

@Component({
  selector: 'admin-navigation',
  standalone: false,
  templateUrl: './admin-navigation.component.html',
  styleUrl: './admin-navigation.component.css'
})
export class AdminNavigationComponent implements OnInit {
  fil: {label:string , url:string}[] = [];

  baseTitle: string = "Administration ";
  pageTitle: string = "";

  
  public adminForm!: FormGroup;
  public admin:Admin = new Admin('','');
  public adminFields = [
    { label: 'Login', name: 'login', type: 'text' as const, required: true },
    { label: 'Password', name: 'password', type: 'password' as const, required: true },
  ];  
  public showModal:boolean = false;
  public successMessage = '';

  constructor(private router:Router,private formBuilder: FormBuilder,private service:AdminService, private authService:AuthService,private modalService: ModalService){}


  

  ngOnInit(): void {

    this.generateBreadcrumbs(this.router.url);

    this.setPageTitle();

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.generateBreadcrumbs(event.urlAfterRedirects);
      this.setPageTitle();
    });

    this.adminForm = this.formBuilder.group({
      login: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.modalService.showModal$.subscribe(() => {
      this.openModal();
    });

  }

  ouvrirParametresAdmin() {
    this.modalService.triggerModal();
  }

  public findAdminAccount(){


    if(!this.admin.id){
      let login = this.authService.getLoginFromToken();


      this.service.findByLogin(login).subscribe(
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

      this.service.save(this.admin).subscribe()

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

  capitalize(str:string):string{
    if(!str){return ''}
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  generateBreadcrumbs(url: string) {
    const parts = url.split('/').filter(part => part); // enlever les vides
    let path = '';
    this.fil = parts.map(part => {
      path += '/' + part;
      return { label: this.capitalize(part), url: path };
    });
  }

  setPageTitle() {
    const currentUrl = this.router.url;
    if (currentUrl.includes('/utilisateur')) {
      this.pageTitle = this.baseTitle + "d'Utilisateur";
    } else if (currentUrl.includes('/culture')) {
      this.pageTitle = this.baseTitle +  'de Culture';
    } else if (currentUrl.includes('/jardin')) {
      this.pageTitle = this.baseTitle +  'de Jardin';
    } else if (currentUrl.includes('/badges_obtenus')) {  
      this.pageTitle = this.baseTitle +  'des Badges';
    } else if (currentUrl.includes('/plante')) {  
      this.pageTitle = this.baseTitle +  'des Plantes';
    } else {
      this.pageTitle = this.baseTitle + 'de Plante&Moi';  // Titre par défaut si aucune page spécifique
    }
  }

  logOut(){
    this.authService.logout();
  }

}
