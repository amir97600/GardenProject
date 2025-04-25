import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LucideAngularModule, Home, Leaf, User, Search, LogOut } from 'lucide-angular';
import { GardenNavigationComponent } from './garden-navigation/garden-navigation.component';

@NgModule({
  declarations: [
    AppComponent,
    GardenNavigationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LucideAngularModule.pick({Home, Leaf, User, Search, LogOut})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
