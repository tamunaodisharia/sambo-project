import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProfileStorageService } from 'src/app/shared/services/services/profile-storage.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-athlete-edit-modal',
  templateUrl: './athlete-edit-modal.component.html',
  styleUrls: ['./athlete-edit-modal.component.scss'],
})
export class AthleteEditModalComponent implements OnInit {
  registerForm: any;
  formSubmitted: boolean = false;
  successText: any;
  element: any;

  constructor(
    private http: HttpClient,
    private dialogRef: MatDialogRef<AthleteEditModalComponent>,
    private profileStorageService: ProfileStorageService,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
    this.element = data.data;
  }

  ngOnInit(): void {
    this.initializeForm();
    if (this.element.element.id) {
      this.setFormValues();
    }
  }

  onSubmit() {
    this.formSubmitted = true;
    this.successText = '';
    if (this.registerForm.invalid) return;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'my-auth-token',
      }),
    };

    httpOptions.headers = httpOptions.headers.set(
      'Authorization',
      `Bearer ${this.profileStorageService.getToken()}`
    );
    this.registerForm.value.id = this.element.element.id;

    return this.http
      .put(
        'http://127.0.0.1:8000/api/athlete/' +
          this.element.element.id +
          '/edit',
        this.registerForm.value,

        {
          headers: httpOptions.headers,
        }
      )
      .subscribe(
        (res) => {
          this.registerForm.reset();
          this.successText = 'წარმატებით დარეგისტრირდა ბაზაში';
          this.dialogRef.close('SUCCESS');
        },
        (err) => {}
      );
  }
  onCancel() {
    this.dialogRef.close('FAIL');
  }
  setFormValues() {
    Object.keys(this.element.element).forEach((el) => {
      if (el !== 'id')
        this.registerForm?.controls[el]?.setValue(this.element.element[el]);
    });
  }

  private initializeForm() {
    this.registerForm = new FormGroup({
      name: new FormControl('', Validators.required),
      surname: new FormControl('', Validators.required),
      date_of_birth: new FormControl('', Validators.required),
      weight: new FormControl('', [Validators.required]),
      height: new FormControl('', Validators.required),
      club: new FormControl('', Validators.required),
    });
  }
}
