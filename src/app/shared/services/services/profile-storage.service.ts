import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProfileStorageService {
  getToken() {
    return localStorage.getItem('token');
  }

  getRole() {
    return localStorage.getItem('userRole');
  }

  getUserId() {
    return localStorage.getItem('id');
  }
}
