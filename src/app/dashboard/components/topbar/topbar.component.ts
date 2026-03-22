import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Auth } from '../../../auth/auth.service';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css',
})
export class Topbar {
  @Input() isDark = true;
  @Output() themeToggle = new EventEmitter<void>();

  constructor(private auth: Auth) {}

  toggle(): void {
    this.themeToggle.emit();
  }

  logout(): void {
    this.auth.logout();
  }
}