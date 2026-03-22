import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class Dashboard {
  constructor(private router: Router){}
  logout(){
    localStorage.removeItem('access_token');
    this.router.navigate(['/']);
  }
}
