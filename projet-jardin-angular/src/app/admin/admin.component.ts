import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Admin } from '../model/admin';
import { AdminService } from '../service/admin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-Admin',
  standalone: false,
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit, OnDestroy {
  AdminForm!: FormGroup;
  Admins$!: Observable<Admin[]>;
  editingAdmin!: Admin | null;
  subscriptions: any = [];

  constructor(private service: AdminService, private formBuilder: FormBuilder) { }
  
  ngOnInit(): void {
    this.AdminForm = this.formBuilder.group({
      login: this.formBuilder.control('Entrez le login', Validators.required),
      password: this.formBuilder.control('Entrez le mot de passe', Validators.required)
    });
    
    this.Admins$ = this.service.findAll();
  }

  ngOnDestroy(): void {
    this.unsub('addOrEdit');
    this.unsub('delete');
  }

  public addOrEditAdmin() {
    this.unsub('addOrEdit');

    this.subscriptions['addOrEdit'] = this.service.save({
      id: this.editingAdmin?.id,
      ...this.AdminForm.value
    }).subscribe(() => this.service.refresh());

    this.editingAdmin = null;
    this.AdminForm.get('login')?.setValue("");
    this.AdminForm.get('password')?.setValue("");
  }

  public editAdmin(Admin: Admin) {
    this.AdminForm.get('login')?.setValue(Admin.login);
    this.AdminForm.get('password')?.setValue(Admin.password);
    this.editingAdmin = Admin;
  }

  public deleteAdmin(Admin: Admin) {
    this.unsub('delete');

    this.subscriptions['delete'] = this.service.delete(Admin).subscribe(() => this.service.refresh());
  }

  private unsub(name: string) {
    if (this.subscriptions[name]) {
      this.subscriptions[name].unsubscribe();
      this.subscriptions[name] = null;
    }
  }
}
