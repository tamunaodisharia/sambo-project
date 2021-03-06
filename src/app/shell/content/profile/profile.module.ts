import { NgModule } from '@angular/core';
import { MatNativeDateModule } from '@angular/material/core';

import { ProfileComponent } from './profile.component';
import { ProfileDetailsComponent } from './profile-details/profile-details.component';
import { ProfileActionsComponent } from './profile-actions/profile-actions.component';
import { RegisterFormComponent } from './profile-actions/register-form/register-form.component';

import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AuthComponent } from '../auth/auth.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AthleteEditModalComponent } from './profile-actions/athlete-edit-modal/athlete-edit-modal.component';
@NgModule({
  declarations: [
    ProfileComponent,
    ProfileDetailsComponent,
    ProfileActionsComponent,
    RegisterFormComponent,
    AuthComponent,
    AthleteEditModalComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    HttpClientModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatSnackBarModule,
  ],
  providers: [],
  bootstrap: [ProfileComponent],
})
export class ProfileModule {}
