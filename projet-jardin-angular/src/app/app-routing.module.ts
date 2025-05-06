import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConnexionComponent } from './connexion/connexion.component';
import { AdminComponent } from './admin/admin.component';
import { ProfilComponent } from './profil/profil.component';
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { authGuard } from './authentification/auth.guard';
import { Error404Component } from './error404/error404.component';
import { CulturesComponent } from './cultures/cultures.component';
import { ExplorerComponent } from './explorer/explorer.component';
import { FullLayoutComponent } from './layouts/full-layout/full-layout.component';
import { EmptyLayoutComponent } from './layouts/empty-layout/empty-layout.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';

const routes: Routes = [
  {
    path: '',
    component: FullLayoutComponent,
    children: [
      { path: 'profil', component : ProfilComponent, canActivate:[authGuard]},
      { path: 'explorer', component : ExplorerComponent},
      { path: 'cultures', component : CulturesComponent },
    ]
  },
  {
    path: '',
    component: EmptyLayoutComponent,
    children: [
      { path: '', component: ConnexionComponent },
      { path: '**', component : Error404Component}
    ]
  },
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: 'home-admin', component: HomeAdminComponent, canActivate:[authGuard] },
      { path: 'admin', component: AdminComponent, canActivate:[authGuard] },
      { path: 'admin/1', component: AdminComponent, canActivate:[authGuard] },
    ]
  },
  
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
