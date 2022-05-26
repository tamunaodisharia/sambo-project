import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { map } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  // constructor(private http: HttpClient) {
  //   this.checkApi().subscribe((result) => {
  //     console.log(result);
  //   });
  // }
  // checkApi() {
  //   return this.http
  //     .get('http://127.0.0.1:8000/api/admin')
  //     .pipe(map((res) => res));
  // }
}
