import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ProfileStorageService } from 'src/app/shared/services/services/profile-storage.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AthleteEditModalComponent } from './athlete-edit-modal/athlete-edit-modal.component';
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
    private http: HttpClient,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.role = this.profileStorageService.getRole();
    if (this.role === 'coach') {
      this.getCoachesAthletes();
    }
  }

  onEditAthlete(element: any): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = {
      element: element,
    };
    const dialogRef = this.dialog.open(AthleteEditModalComponent, {
      width: '50%',
      data: dialogConfig,
    });

    dialogRef.afterClosed().subscribe(
      (result) => {
        this.getCoachesAthletes();
        if (result === 'SUCCESS') {
          this.openSnackBar(
            'ცვლილებები წარმატებით განხორციელდა',
            'green-popup'
          );
        } else {
          this.openSnackBar('ცვლილებები არ განხორციელდა', 'red-popup');
        }
      },
      () => {
        this.openSnackBar('ცვლილებები არ განხორციელდა', 'red-popup');
      }
    );
  }

  openSnackBar(message: string, cssClass: string) {
    this._snackBar.open(message, undefined, {
      duration: 2000,
      panelClass: cssClass,
    });
  }

  getCoachesAthletes() {
    return this.http
      .get(
        'http://127.0.0.1:8000/api/coaches/' +
          this.profileStorageService.getUserId() +
          '/athletes'
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

  onDeleteAthlete(athlete: any) {
    if (window.confirm('ნამდვილად გსურთ წაშლა?')) {
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
            this.openSnackBar(
              'ცვლილებები წარმატებით განხორციელდა',
              'green-popup'
            );
            this.getCoachesAthletes();
          },
          (err) => {
            this.openSnackBar('ცვლილებები არ განხორციელდა', 'red-popup');
          }
        );
    } else {
      this.openSnackBar('ცვლილებები არ განხორციელდა', 'red-popup');
      this.getCoachesAthletes();
      return;
    }
  }
}
