import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProfileStorageService } from 'src/app/shared/services/services/profile-storage.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
@Component({
  selector: 'app-athletes',
  templateUrl: './athletes.component.html',
  styleUrls: ['./athletes.component.scss'],
})
export class AthletesComponent implements OnInit {
  athletes: any;
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(
    private profileStorageService: ProfileStorageService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.getCoachesAthletes();
  }

  getCoachesAthletes() {
    return this.http.get('http://127.0.0.1:8000/api/athletes').subscribe(
      (athletes: any) => {
        this.athletes = new MatTableDataSource(athletes?.data);
        this.athletes.paginator = this.paginator;
      },
      (err) => {}
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.athletes.filter = filterValue.trim().toLowerCase();

    if (this.athletes.paginator) {
      this.athletes.paginator.firstPage();
    }
  }
}
