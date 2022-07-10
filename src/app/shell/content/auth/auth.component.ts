import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  authForm: any;
  formSubmitted: boolean = false;
  generalErrors: any;
  errorsKeys: any;
  constructor(
    private http: HttpClient,
    private router: Router,
    private titleService: Title
  ) {
    this.titleService.setTitle('ავტორიზაცია');
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  onSubmit() {
    this.formSubmitted = true;

    if (this.authForm.invalid) return;

    return this.http
      .post('http://127.0.0.1:8000/api/login', this.authForm.value)
      .subscribe(
        (res: any) => {
          this.router.navigate(['profile']);
          localStorage.setItem('token', res['token']);
          localStorage.setItem('userRole', res['user']['roles']);
          localStorage.setItem('id', res['id']);
          this.generalErrors = {};
          this.errorsKeys = [];
        },
        (err) => {
          this.generalErrors = err.error.errors;
          this.errorsKeys = Object.keys(this.generalErrors);
        }
      );
  }
  private initializeForm() {
    this.authForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }
}
