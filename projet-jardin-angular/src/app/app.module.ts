import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfilComponent } from './profil/profil.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { AdminComponent } from './admin/admin.component';
import { jwtHeaderInterceptor } from './authentification/jwt-header.interceptor';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { AdminFormComponent } from './admin-form/admin-form.component';
import { LucideAngularModule, Home, Leaf, User, Search, LogOut } from 'lucide-angular';
import { GardenNavigationComponent } from './garden-navigation/garden-navigation.component';

@NgModule({
  declarations: [
    AppComponent,
    ProfilComponent
    ConnexionComponent,
    AdminComponent,
    AdminFormComponent,
    GardenNavigationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    LucideAngularModule.pick({Home, Leaf, User, Search, LogOut})
  ],
  providers: [provideHttpClient(withFetch(), withInterceptors([ jwtHeaderInterceptor ]))],// Remplace l'import de HttpClientModule
  bootstrap: [AppComponent]
})
export class AppModule { }
