import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import {AngularFireModule} from '@angular/fire/compat';
import {AngularFireAuthModule} from '@angular/fire/compat/auth';
import {environment} from '../environments/environment';
import { AngularFireRemoteConfigModule } from '@angular/fire/compat/remote-config';
//import { provideRemoteConfig, getRemoteConfig } from '@angular/fire/remote-config'; 
//import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
//import { provideRemoteConfig, getRemoteConfig } from '@angular/fire/remote-config'; // For using Remote Config


@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
     AngularFireModule.initializeApp(environment.firebase), AngularFireAuthModule,
     AngularFireRemoteConfigModule 
    ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
