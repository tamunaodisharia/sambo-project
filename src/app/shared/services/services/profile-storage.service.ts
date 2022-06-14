import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProfileDtorageService {

  getToken() {
    return localStorage.getItem('token');
  }

}