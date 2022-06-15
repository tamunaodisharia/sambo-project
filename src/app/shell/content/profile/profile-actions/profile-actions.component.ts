import { Component, OnInit } from '@angular/core';
import { ProfileStorageService } from 'src/app/shared/services/services/profile-storage.service';

@Component({
  selector: 'app-profile-actions',
  templateUrl: './profile-actions.component.html',
  styleUrls: ['./profile-actions.component.scss'],
})
export class ProfileActionsComponent implements OnInit {
  role: any;

  constructor(private profileStorageService: ProfileStorageService) {}

  ngOnInit() {
    this.role = this.profileStorageService.getRole();
  }
}
