import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthGuard } from './core/auth.guard';

export interface LoginResponse {
  message: '',
  user?: {
    id: string;
    username: string;
    email: string;
  }
  access_token: string;
}

export interface SignupResponse {
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private backendUrl = 'http://localhost:3000';
  constructor(private http: HttpClient, private router: Router, private guard: AuthGuard){}

  signup(data: any): Observable<SignupResponse>{
    return this.http.post<SignupResponse>(`${this.backendUrl}/auth/signup`, data);
  }

  login(data: any): Observable<LoginResponse>{
    return this.http.post<LoginResponse>(`${this.backendUrl}/auth/login`, data)
      .pipe(
        tap((res) => {
          localStorage.setItem('access_token', res.access_token);
        })
      );
  }

  isAuthenticated() {
    const token = localStorage.getItem('access_token');

    if (token) {
      this.router.navigate(['/dashboard']);
    }
  }
  
  logout(){
    localStorage.removeItem('access_token');
    this.router.navigate(['/']);
  }

}