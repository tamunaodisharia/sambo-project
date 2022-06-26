import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ProfileStorageService } from 'src/app/shared/services/services/profile-storage.service';
import { map } from 'rxjs/operators';
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
    this.getTournaments();
    this.getAthletes();
  }

  getTournaments() {
    return this.http
      .get('http://127.0.0.1:8000/api/tournaments')
      .pipe(
        map((results: any) => {
          return results?.data.sort((a: any, b: any) => {
            return new Date(a.start_date).getTime() <
              new Date(b.start_date).getTime()
              ? 1
              : -1;
          });
        })
      )
      .subscribe((tournaments: any) => {
        this.tournaments = tournaments;
        this.canAddAthletes();
      });
  }

  getAthletes() {
    return this.http
      .get(
        'http://127.0.0.1:8000/api/coaches/' +
          this.profileStorageService.getUserId() +
          '/getAthletes'
      )
      .subscribe((athletes: any) => {
        this.athletes = athletes?.data;
      });
  }

  setAthletes(tournament?: any) {
    if (!tournament?.athletesArray?.length) {
      this.addAthletsBtnIsDisabled = true;
      tournament.athletesArray = this.athletes;
    }
  }

  canAddAthletes() {
    this.tournaments.forEach((tournament: any) => {
      tournament.canAddAthletes =
        new Date(tournament?.start_date).getTime() > new Date().getTime();
    });
  }

  delAthletes(tournament?: any) {
    if (!!tournament?.athletesArray?.length) {
      this.addAthletsBtnIsDisabled = false;
      tournament.athletesArray = [];
      this.registerForm.value.athletes = [];
    }
  }

  addAthletes(tournament: any) {
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
      .subscribe((res: any) => {
        this.addAthletsBtnIsDisabled = false;
        tournament.athletesArray = [];
        this.registerForm.value.athletes = [];
        tournament.athletesArray = [];
        this.registerForm.value.athletes = [];
        this.getTournaments();
      });
  }

  private initializeForm() {
    this.registerForm = new FormGroup({
      athletes: new FormControl(''),
    });
  }
}
