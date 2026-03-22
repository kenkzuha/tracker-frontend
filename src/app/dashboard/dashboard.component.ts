import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { Auth } from '../auth/auth.service';

@Component({
  selector: 'app-home',
  imports: [RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class Dashboard {
  constructor(private authService: Auth){}
  logout(){
    this.authService.logout();
  }
}
