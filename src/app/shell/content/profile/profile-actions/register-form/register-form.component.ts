import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  Component,
  OnInit,
  Input,
  ChangeDetectorRef,
  Output,
  EventEmitter,
} from '@angular/core';
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
  @Output() clickOnReg = new EventEmitter<any>();

  registerForm: any;
  formSubmitted: boolean = false;
  role: any;
  referees: any;
  generalErrors: any;
  errorsKeys: any;
  successText: any;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private profileStorageService: ProfileStorageService,
    public datepipe: DatePipe,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.initializeForm();
    if (this.type === 'tournament') {
      this.getReferees();
    }
  }

  getReferees() {
    return this.http
      .get('http://127.0.0.1:8000/api/referees')
      .subscribe((referees: any) => {
        this.changeDetectorRef.detectChanges();
        this.referees = referees?.data;
      });
  }

  getAllReferees() {
    return this.referees;
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

    return this.http
      .post(
        'http://127.0.0.1:8000/api/' + this.type + '-store',
        this.registerForm.value,
        {
          headers: httpOptions.headers,
        }
      )
      .subscribe(
        (res) => {
          this.registerForm.reset();
          this.successText = 'წარმატებით დარეგისტრირდა ბაზაში';
          this.generalErrors = {};
          this.errorsKeys = [];
          this.getReferees();
          this.clickOnReg.emit();
        },
        (err) => {
          this.successText = '';
          this.generalErrors = err.error.errors;
          this.errorsKeys = Object.keys(this.generalErrors);
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
        new FormControl('', Validators.email)
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
      this.registerForm.addControl('referees', new FormControl([]));
    }
  }

  private initializeForm() {
    this.registerForm = new FormGroup({
      name: new FormControl('', Validators.required),
      surname: new FormControl('', Validators.required),
      profile_picture: new FormControl(null),
    });
    this.addControls();
  }
}
