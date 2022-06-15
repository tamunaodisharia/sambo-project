import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContentComponent } from './shell/content/content.component';
import { HeaderComponent } from './shell/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';

import { ProfileModule } from './shell/content/profile/profile.module';
import { HttpClientModule } from '@angular/common/http';
import { AuthComponent } from './shell/content/auth/auth.component';
import { AthletesComponent } from './shell/content/pages/athletes/athletes.component';
import { AboutUsComponent } from './shell/content/pages/about-us/about-us.component';
import { TournamentsComponent } from './shell/content/pages/tournaments/tournaments.component';

@NgModule({
  declarations: [
    AppComponent,
    ContentComponent,
    HeaderComponent,
    AthletesComponent,
    AboutUsComponent,
    TournamentsComponent,
  ],
  imports: [
    ProfileModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    HttpClientModule,
    MatMenuModule,
    MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
