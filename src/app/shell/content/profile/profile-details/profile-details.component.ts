import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProfileStorageService } from 'src/app/shared/services/services/profile-storage.service';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.scss'],
})
export class ProfileDetailsComponent implements OnInit {
  user: any;
  role: any;

  constructor(
    private profileStorageService: ProfileStorageService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.role = this.profileStorageService.getRole();
    this.getProfileInfo();
  }

  getProfileInfo(): any {
    if (this.role === 'coach') {
      return this.http
        .get(
          'http://127.0.0.1:8000/api/coaches/' +
            this.profileStorageService.getUserId()
        )
        .subscribe(
          (res: any) => {
            this.user = res['coach'];
          },
          (err) => {}
        );
    }
  }
}
