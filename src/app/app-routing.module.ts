import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './shell/content/profile/profile.component';

const routes: Routes = [
  { path: 'shell',
    children: [ 
      { 
        path: 'profile',
        component: ProfileComponent 
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
