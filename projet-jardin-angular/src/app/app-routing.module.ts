import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConnexionComponent } from './connexion/connexion.component';
import { AdminComponent } from './admin/admin.component';
import { ProfilComponent } from './profil/profil.component';
import { Error500Component } from './error500/error500.component';
import { Error404Component } from './error404/error404.component';

const routes: Routes = [
  { path: 'profil', component : ProfilComponent},
  { path: 'connexion', component: ConnexionComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'error500', component : Error500Component},
  { path: 'error404', component : Error404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
