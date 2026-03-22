import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Auth } from '../auth/auth.service';

@Component({
  selector: 'app-home',
  imports: [RouterLink, CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class Home {
  isDark = true;
  constructor(private authService: Auth){}

  toggleTheme(): void {
    this.isDark = !this.isDark;
  }

  ngOnInit(){
    this.authService.isAuthenticated();
  }

}
