import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileDtorageService } from 'src/app/shared/services/services/profile-storage.service';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.scss'],
})
export class ProfileDetailsComponent {
  name: string = 'ნინო';
  surname: string = 'კუპატაძე';
  position: string = 'მაგარი ვინმე';
  constructor(private http: HttpClient, private router: Router, private profileDtorageService: ProfileDtorageService) {}

  onlogout() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'my-auth-token',
      }),
    };
    httpOptions.headers = httpOptions.headers.set(
      'Authorization',
      `Bearer ${this.profileDtorageService.getToken()}`
    );
    return this.http
      .post(
        'http://127.0.0.1:8000/api/logout',
        {},
        {
          headers: httpOptions.headers,
        }
      )
      .subscribe(
        () => {
          this.router.navigate(['login']);
          localStorage.clear();
        },
        (err) => {
          console.log(err);
        }
      );
  }
}
