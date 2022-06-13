import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.scss'],
})
export class ProfileDetailsComponent {
  name: string = 'ნინო';
  surname: string = 'კუპატაძე';
  position: string = 'მაგარი ვინმე';
  constructor(private http: HttpClient, private router: Router) {}
  onlogout() {
    return this.http.post('http://127.0.0.1:8000/api/logout', {}).subscribe(
      () => {
        this.router.navigate(['login']);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
