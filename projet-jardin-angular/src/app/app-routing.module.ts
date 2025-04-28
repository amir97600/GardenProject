import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConnexionComponent } from './connexion/connexion.component';
import { AdminComponent } from './admin/admin.component';
import { ProfilComponent } from './profil/profil.component';
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { authGuard } from './authentification/auth.guard';
import { Error500Component } from './error500/error500.component';
import { Error404Component } from './error404/error404.component';
import { CulturesComponent } from './cultures/cultures.component';
import { ExplorerComponent } from './explorer/explorer.component';


const routes: Routes = [
  { path: 'profil', component : ProfilComponent, canActivate:[authGuard]},
  { path: '', component: ConnexionComponent },
  { path: 'home-admin', component: HomeAdminComponent, canActivate:[authGuard] },
  { path: 'admin', component: AdminComponent, canActivate:[authGuard] },
  { path: 'admin/1', component: AdminComponent, canActivate:[authGuard] },
  { path: 'explorer', component : ExplorerComponent},
  { path: '**', component : Error404Component}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
