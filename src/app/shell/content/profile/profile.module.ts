import { NgModule } from '@angular/core';

import { ProfileComponent } from './profile.component';
import { ProfileDetailsComponent } from './profile-details/profile-details.component';
import { ProfileActionsComponent } from './profile-actions/profile-actions.component';

import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';  

@NgModule({
    declarations: [ProfileComponent, ProfileDetailsComponent, ProfileActionsComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatButtonModule,
        HttpClientModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
      ],
    providers: [],
    bootstrap: [ProfileComponent],
})

export class ProfileModule {}