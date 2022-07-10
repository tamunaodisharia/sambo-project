import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ProfileStorageService } from '../shared/services/services/profile-storage.service';

@Injectable({
  providedIn: 'root',
})
export class LoggedOutGuard implements CanActivate {
  constructor(private auth: ProfileStorageService, private router: Router) {}
  canActivate(): boolean {
    this.router.navigate(['']);
    return this.auth.getToken() ? true : false;
  }
}
