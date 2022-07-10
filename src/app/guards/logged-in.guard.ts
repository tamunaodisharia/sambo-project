import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ProfileStorageService } from '../shared/services/services/profile-storage.service';

@Injectable({
  providedIn: 'root',
})
export class LoggedInGuard implements CanActivate {
  constructor(private auth: ProfileStorageService, private router: Router) {}
  canActivate(): boolean {
    if (this.auth.getToken()) {
      this.router.navigate(['']);
      return false;
    } else return true;
  }
}
