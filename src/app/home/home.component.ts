import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Auth } from '../auth/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class Home {
  constructor(private router: Router, private authService: Auth) {}

  particles = Array.from({ length: 30 }, () => {
    const size = Math.random() * 3 + 1;
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const duration = Math.random() * 6 + 4;
    const delay = Math.random() * 5;
    const opacity = Math.random() * 0.5 + 0.1;
    return `
      width: ${size}px;
      height: ${size}px;
      left: ${x}%;
      top: ${y}%;
      animation-duration: ${duration}s;
      animation-delay: ${delay}s;
      opacity: ${opacity};
    `;
  });

  goToLogin(): void {
    this.router.navigate(['/login']);
  }

  goToSignup(): void {
    this.router.navigate(['/signup']);
  }

  ngOnInit() {
    if(this.authService.isAuthenticated()){
      this.router.navigate(['/dashboard'])
    }
  }
}