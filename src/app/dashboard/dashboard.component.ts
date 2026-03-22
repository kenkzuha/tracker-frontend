import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from './components/sidebar/sidebar.component';
import { Topbar } from './components/topbar/topbar.component';
import { StatCard } from './components/stat-card/stat-card.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterOutlet, Sidebar, Topbar, StatCard],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class Dashboard {
  isDark = true;

  toggleTheme(): void {
    this.isDark = !this.isDark;
  }

  stats = [
    { label: 'Total Value', value: '$24,812', change: '▲ 3.2% today', positive: true },
    { label: 'Total Profit/Loss', value: '$4,231', change: '▲ 20.5% all time', positive: true },
    { label: 'Best Performer', value: 'BTC-USD', change: '▲ 8.4% this week', positive: true },
    { label: 'Total Assets', value: '7', change: 'across 2 markets', positive: null },
  ];
}