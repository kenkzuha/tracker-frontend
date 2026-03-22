import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stat-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stat-card.component.html',
  styleUrl: './stat-card.component.css',
})
export class StatCard {
  @Input() label = '';
  @Input() value = '';
  @Input() change = '';
  @Input() positive: boolean | null = null;
  @Input() isDark = true;
}