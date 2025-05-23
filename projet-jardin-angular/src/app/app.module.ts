import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfilComponent } from './profil/profil.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { jwtHeaderInterceptor } from './authentification/jwt-header.interceptor';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { LucideAngularModule, Home, Leaf, User, Search, LogOut, PlusCircle,Settings, Pencil, Trash2, SearchIcon } from 'lucide-angular';
import { GardenNavigationComponent } from './garden-navigation/garden-navigation.component';
import { InputTextComponent } from './input-text/input-text.component';
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { AdminNavigationComponent } from './admin-navigation/admin-navigation.component';
import { GardenFooterComponent } from './garden-footer/garden-footer.component';
import { Error500Component } from './error500/error500.component';
import { Error404Component } from './error404/error404.component';
import { ExplorerComponent } from './explorer/explorer.component';
import { PlantCardComponent } from './plant-card/plant-card.component';
import { CulturesComponent } from './cultures/cultures.component';
import { ExplorerFiltrePipe } from './pipe/explorer-filtre.pipe';
import { EmptyLayoutComponent } from './layouts/empty-layout/empty-layout.component';
import { FullLayoutComponent } from './layouts/full-layout/full-layout.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { Error403Component } from './error403/error403.component';
import { AdminUtilisateursComponent } from './admin-utilisateurs/admin-utilisateurs.component';
import { AdminJardinComponent } from './admin-jardin/admin-jardin.component';
import { AdminCultureComponent } from './admin-culture/admin-culture.component'; 
import { ModificationModalComponent } from './modal/modification-modal/modification-modal.component';
import { ConfirmationModalComponent } from './modal/confirmation-modal/confirmation-modal.component';
import { ModificationLieuModalComponent } from './modal/modification-lieu-modal/modification-lieu-modal.component';
import { HomeClientComponent } from './home-client/home-client.component';
import { AlertBadgeModalComponent } from './modal/alert-badge-modal/alert-badge-modal.component';
import { InscriptionModalComponent } from './modal/inscription-modal/inscription-modal.component';
import { ModalFormComponent } from './modal/modal-form/modal-form.component';
import { AdminFilterComponent } from './admin-filter/admin-filter.component';
import { UserTableComponent } from './user-table/user-table.component';
import { GeneralTableComponent } from './general-table/general-table.component';
import { AdminPlanteComponent } from './admin-plante/admin-plante.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { AProposComponent } from './a-propos/a-propos.component';
import { AvatarSelectionModalComponent } from './modal/avatar-selection-modal/avatar-selection-modal.component';
import { ForgotPasswordModalComponent } from './modal/forgot-password-modal/forgot-password-modal.component';



@NgModule({
  declarations: [
    AppComponent,
    ProfilComponent,
    ConnexionComponent,
    GardenNavigationComponent,
    InputTextComponent,
    HomeAdminComponent,
    AdminNavigationComponent,
    GardenFooterComponent,
    Error500Component,
    ExplorerComponent,
    PlantCardComponent,
    Error404Component,
    ExplorerComponent,
    PlantCardComponent,
    Error404Component,
    CulturesComponent,
    ExplorerFiltrePipe,
    EmptyLayoutComponent,
    FullLayoutComponent,
    AdminLayoutComponent,
    Error403Component,
    AdminUtilisateursComponent,
    AdminJardinComponent,
    AdminCultureComponent,
    ModificationModalComponent,
    ConfirmationModalComponent,
    ModificationLieuModalComponent,
    AlertBadgeModalComponent,
    InscriptionModalComponent,
    ModalFormComponent,
    AdminFilterComponent,
    UserTableComponent,
    GeneralTableComponent,
    AdminPlanteComponent,
    HomeClientComponent,
    FileUploadComponent,
    AProposComponent,
    AvatarSelectionModalComponent,
    ForgotPasswordModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    LucideAngularModule.pick({Home, Leaf, User, Search, LogOut, PlusCircle, Settings, Pencil, Trash2, SearchIcon}),
    FormsModule
    
  ],
  providers: [provideHttpClient(withFetch(), withInterceptors([ jwtHeaderInterceptor ]))],// Remplace l'import de HttpClientModule
  bootstrap: [AppComponent]
})
export class AppModule { }
