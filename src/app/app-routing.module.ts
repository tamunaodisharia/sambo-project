import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoggedInGuard } from './guards/logged-in.guard';
import { LoggedOutGuard } from './guards/logged-out.guard';
import { AuthComponent } from './shell/content/auth/auth.component';
import { AboutUsComponent } from './shell/content/pages/about-us/about-us.component';
import { AthletesComponent } from './shell/content/pages/athletes/athletes.component';
import { TournamentsComponent } from './shell/content/pages/tournaments/tournaments.component';
import { ProfileComponent } from './shell/content/profile/profile.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [LoggedOutGuard],
      },
      {
        path: 'about-us',
        component: AboutUsComponent,
      },
      {
        path: 'athletes',
        component: AthletesComponent,
      },
      {
        path: 'tournaments',
        component: TournamentsComponent,
      },
      {
        path: 'login',
        canActivate: [LoggedInGuard],
        component: AuthComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
