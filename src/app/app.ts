import { Component, signal, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('frontend');
  private http = inject(HttpClient);

  message = signal<string | null>(null);

  loadFromBackend() {
    this.http
      .get<HelloResponse>('http://localhost:3000/api/hello')
      .subscribe({
        next: (response) => {
          this.message.set(response.message);
        },
        error: (error) => {
          console.error(error);
        }
      });
  }
}

interface HelloResponse {
  message: string;
}