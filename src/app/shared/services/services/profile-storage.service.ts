import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProfileStorageService {

  getToken() {
    return localStorage.getItem('token');
  }

}