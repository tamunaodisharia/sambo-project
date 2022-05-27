import { Component, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false; // needs change

  constructor(private router: Router) {}

  ngOnInit(): void {}

  onAuth() {
    this.isLoggedIn = true;
  }

  onProfile() {
    this.router.navigate(['shell/profile']);
  }

  onLogOut() {
    this.isLoggedIn = false;
    this.router.navigate(['shell']);
  }
}
