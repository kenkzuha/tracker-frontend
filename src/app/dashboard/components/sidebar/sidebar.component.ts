import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class Sidebar {
  @Input() isDark = true;

  navItems = [
    { label: 'Portfolio', icon: 'grid', route: '/dashboard' },
    { label: 'Markets', icon: 'trending-up', route: '/markets' },
    { label: 'Transactions', icon: 'repeat', route: '/transactions' },
  ];

  bottomItems = [
    { label: 'Settings', icon: 'settings', route: '/settings' },
    { label: 'Profile', icon: 'user', route: '/profile' },
  ];
}