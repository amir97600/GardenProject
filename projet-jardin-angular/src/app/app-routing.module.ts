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
import { AdminGuard } from './admin/admin.guard';
import { Error403Component } from './error403/error403.component';
import { MeteoComponent } from './meteo/meteo.component';

const routes: Routes = [
  {
    path: '',
    component: EmptyLayoutComponent,
    children: [
      { path: '', component: ConnexionComponent },
      { path: '403',component: Error403Component },
    ]
  },
  {
    path: '',
    component: FullLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: 'profil', component: ProfilComponent },
      { path: 'explorer', component: ExplorerComponent },
      { path: 'cultures', component: CulturesComponent }
    ]
  },
  {
    path: 'home-admin',
    component: AdminLayoutComponent,
    canActivate: [authGuard,AdminGuard],
    children: [
      { path: '', component: HomeAdminComponent },
      { path: 'admin', component: AdminComponent },
      { path: 'admin/1', component: AdminComponent },
    ]
  },
  // Catch-all route (must be LAST)
  {
    path: '404',
    component: Error404Component
  },
  {
    path: 'meteo',
    component: MeteoComponent
  },
  {
    path: '**',
    redirectTo: '404'
  }
  
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
