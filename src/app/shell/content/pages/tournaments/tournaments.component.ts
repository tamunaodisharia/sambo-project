import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ProfileStorageService } from 'src/app/shared/services/services/profile-storage.service';
@Component({
  selector: 'app-tournaments',
  templateUrl: './tournaments.component.html',
  styleUrls: ['./tournaments.component.scss'],
})
export class TournamentsComponent implements OnInit {
  role: any;
  tournaments: any;
  referees: any;
  registerForm: any;
  athletes: any;
  addAthletsBtnIsDisabled: boolean = false;

  constructor(
    private profileStorageService: ProfileStorageService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.role = this.profileStorageService.getRole();
    this.getTurnaments();
    this.getAthletes();
  }

  getTurnaments() {
    return this.http.get('http://127.0.0.1:8000/api/tournaments').subscribe(
      (tournaments: any) => {
        this.tournaments = tournaments?.data;
        console.log(this.tournaments[0].referees);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getAthletes() {
    return this.http
      .get(
        'http://127.0.0.1:8000/api/coaches/' +
          this.profileStorageService.getUserId() +
          '/getAthletes'
      )
      .subscribe(
        (athletes: any) => {
          // tournament.athletesArray = athletes?.data;
          this.athletes = athletes?.data;
        },
        (err) => {
          console.log(err);
        }
      );
  }

  setAthletes(tournament?: any) {
    if (!tournament?.athletesArray?.length) {
      this.addAthletsBtnIsDisabled = true;
      tournament.athletesArray = this.athletes;
    } 
  }

  delAthletes(tournament?: any) {
    if (!!tournament?.athletesArray?.length) {
      this.addAthletsBtnIsDisabled = false;
      tournament.athletesArray = [];
      this.registerForm.value.athletes = [];
    }
  }

  addAthletes(tournament: any) {
    console.log(
      this.registerForm.value.athletes,
      'this.registerForm.athletes.value,'
    );
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
        'http://127.0.0.1:8000/api/tournament/' +
          tournament?.id +
          '/addAthletes',
        { athletes: this.registerForm.value.athletes },

        {
          headers: httpOptions.headers,
        }
      )
      .subscribe(
        (res: any) => {
          console.log(this.registerForm.value.athletes, 'successes');
          tournament.athletesArray = [];
          this.registerForm.value.athletes = [];

        },
        (err) => {
          console.log(err);
        }
      );
  }

  private initializeForm() {
    this.registerForm = new FormGroup({
      athletes: new FormControl(''),
    });
  }
}
