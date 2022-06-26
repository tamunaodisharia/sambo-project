import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ProfileStorageService } from 'src/app/shared/services/services/profile-storage.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-profile-actions',
  templateUrl: './profile-actions.component.html',
  styleUrls: ['./profile-actions.component.scss'],
})
export class ProfileActionsComponent implements OnInit {
  role: any;
  athletes: any;
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(
    private profileStorageService: ProfileStorageService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.role = this.profileStorageService.getRole();
    if (this.role === 'coach') {
      this.getCoachesAthletes();
    }
  }

  getCoachesAthletes() {
    return this.http
      .get(
        'http://127.0.0.1:8000/api/coaches/' +
          this.profileStorageService.getUserId() +
          '/getAthletes'
      )
      .subscribe(
        (athletes: any) => {
          this.athletes = new MatTableDataSource(athletes?.data);
          this.athletes.paginator = this.paginator;
        },
        (err) => {}
      );
  }

  clickOnReg() {
    this.getCoachesAthletes();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.athletes.filter = filterValue.trim().toLowerCase();

    if (this.athletes.paginator) {
      this.athletes.paginator.firstPage();
    }
  }

  onDeleteAAthlete(athlete: any) {
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
      .delete('http://127.0.0.1:8000/api/athlete/' + athlete?.id, {
        headers: httpOptions.headers,
      })
      .subscribe(
        (athletes: any) => {
          if (window.confirm('ნამდვილად გსურთ წაშლა?')) {
            alert('წარმატებით წაიშალა.');
            this.getCoachesAthletes();
          }
        },
        (err) => {}
      );
  }
}
