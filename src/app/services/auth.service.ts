import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterData, RegisterResponse } from '../interfaces/register.interface';
import { lastValueFrom } from 'rxjs';
import { getgid } from 'process';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = 'http://localhost:3000/api/v1';

  constructor(private http: HttpClient) { }

  checkBackend() {
    return this.http.get(`${this.url}/status`);
  }

  register(userData: RegisterData): Promise<RegisterResponse> {
    return lastValueFrom(this.http.post<RegisterResponse>(`${this.url}/register`, userData));
  }
}


