import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProfileStorageService } from 'src/app/shared/services/services/profile-storage.service';

import { DatePipe } from '@angular/common';

@Component({
  selector: 'register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
  providers: [ProfileStorageService, DatePipe],
})
export class RegisterFormComponent implements OnInit {
  @Input() type: string = '';

  registerForm: any;
  formSubmitted: boolean = false;
  role: any;
  referees: any;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private profileStorageService: ProfileStorageService,
    public datepipe: DatePipe
  ) {}

  ngOnInit() {
    this.initializeForm();
    if (this.type === 'tournament') {
      this.getReferees();
    }
  }

  getReferees() {
    return this.http.get('http://127.0.0.1:8000/api/referees').subscribe(
      (referees: any) => {
        console.log(referees);
        this.referees = referees?.data;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onSubmit() {
    this.formSubmitted = true;
    console.log(this.registerForm);
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

    // let formValue = { ...this.registerForm };
    // console.log(formValue, 'formValue');
    // formValue.date_of_birth = this.datepipe.transform(
    //   new Date(this.registerForm.date_of_birth),
    //   'yyyy-MM-dd'
    // );
    // console.log('formValue.date_of_birth', formValue.date_of_birth);
    // return;

    return this.http
      .post(
        'http://127.0.0.1:8000/api/' + this.type + '-store',
        this.registerForm.value,
        {
          headers: httpOptions.headers,
        }
      )
      .subscribe(
        () => {},
        (err) => {
          console.log(err);
        }
      );
  }

  addControls() {
    if (this.type === 'coach') {
      this.registerForm.addControl(
        'username',
        new FormControl('', Validators.required)
      );
      this.registerForm.addControl(
        'tel',
        new FormControl('', Validators.required)
      );
      this.registerForm.addControl(
        'club',
        new FormControl('', Validators.required)
      );
      this.registerForm.addControl('profile_picture', new FormControl(''));
      this.registerForm.addControl(
        'email',
        new FormControl('', [Validators.required, Validators.email])
      );
      this.registerForm.addControl(
        'password',
        new FormControl('', Validators.required)
      );
      this.registerForm.addControl(
        'password_confirmation',
        new FormControl('', Validators.required)
      );
    } else if (this.type === 'referee') {
      this.registerForm.addControl('description', new FormControl(''));
    } else if (this.type === 'athlete') {
      this.registerForm.addControl(
        'date_of_birth',
        new FormControl('', Validators.required)
      );
      this.registerForm.addControl(
        'weight',
        new FormControl('', [Validators.required])
      );
      this.registerForm.addControl(
        'height',
        new FormControl('', Validators.required)
      );
      this.registerForm.addControl(
        'club',
        new FormControl('', Validators.required)
      );
      this.registerForm.addControl('profile_picture', new FormControl(''));
    } else if (this.type === 'tournament') {
      this.registerForm.removeControl('name');
      this.registerForm.removeControl('surname');
      this.registerForm.removeControl('profile_picture');
      this.registerForm.addControl(
        'title',
        new FormControl('', Validators.required)
      );
      this.registerForm.addControl(
        'location',
        new FormControl('', Validators.required)
      );
      this.registerForm.addControl(
        'start_date',
        new FormControl('', Validators.required)
      );
      this.registerForm.addControl(
        'end_date',
        new FormControl('', Validators.required)
      );
      this.registerForm.addControl(
        'referees',
        new FormControl([], Validators.required)
      );
    }
  }

  // 'title' => 'required',
  //           'location' => 'required',
  //           'start_date' => 'required|date',
  //           'end_date' => 'required|date',
  //           'referees' => 'array'

  private initializeForm() {
    this.registerForm = new FormGroup({
      name: new FormControl('', Validators.required),
      surname: new FormControl('', Validators.required),
      profile_picture: new FormControl(null),
    });
    this.addControls();
  }
}
