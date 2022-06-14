import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
})
export class RegisterFormComponent implements OnInit {
  @Input() type: string = '';

  registerForm: any;
  formSubmitted: boolean = false;

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit() {
    this.initializeForm();
  }

  onSubmit() {
    this.formSubmitted = true;

    console.log(this.type, 'type');

    if (this.registerForm.invalid) return;
    console.log('valid registration');
    if (this.type === 'referee') {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'my-auth-token',
        }),
      };
      httpOptions.headers = httpOptions.headers.set(
        'Authorization',
        `Bearer ${localStorage.getItem('token')}`
      );
      return this.http
        .post(
          'http://127.0.0.1:8000/api/referee-store',
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
    } else {
      return;
    }
  }

  addControls() {
    if (this.type === 'coach') {
      this.registerForm.addControl(
        'club',
        new FormControl('', Validators.required)
      );
      this.registerForm.addControl(
        'email',
        new FormControl('', [Validators.required, Validators.email])
      );
      this.registerForm.addControl(
        'password',
        new FormControl('', Validators.required)
      );
    } else if (this.type === 'referee') {
      this.registerForm.addControl('description', new FormControl(''));
    } else if (this.type === 'sportsman') {
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
    }
  }

  private initializeForm() {
    this.registerForm = new FormGroup({
      name: new FormControl('', Validators.required),
      surname: new FormControl('', Validators.required),
    });
    this.addControls();
  }
}
