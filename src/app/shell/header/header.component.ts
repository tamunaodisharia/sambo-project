import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { Router } from '@angular/router';
import { ProfileStorageService } from 'src/app/shared/services/services/profile-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false; // needs change

  constructor(
    private profileStorageService: ProfileStorageService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {}

  getUser() {
    return !!this.profileStorageService.getToken();
  }

  onAuth() {
    this.isLoggedIn = true;
    this.router.navigate(['login']);
  }
  onAboutUs() {
    this.router.navigate(['about-us']);
  }
  onAthletes() {
    this.router.navigate(['athletes']);
  }
  onTournaments() {
    this.router.navigate(['tournaments']);
  }
  onProfile() {
    this.router.navigate(['profile']);
  }

  onLogOut() {
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
    this.router.navigate(['login']);
  }
}
