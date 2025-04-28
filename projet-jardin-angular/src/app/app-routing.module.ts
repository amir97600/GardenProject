import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConnexionComponent } from './connexion/connexion.component';
import { AdminComponent } from './admin/admin.component';
import { ProfilComponent } from './profil/profil.component';
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { authGuard } from './authentification/auth.guard';

const routes: Routes = [
  { path: '', component : ProfilComponent, canActivate:[authGuard]},
  { path: 'connexion', component: ConnexionComponent },
  { path: 'home-admin', component: HomeAdminComponent, canActivate:[authGuard] },
  { path: 'admin', component: AdminComponent, canActivate:[authGuard] },
  { path: 'admin/1', component: AdminComponent, canActivate:[authGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
