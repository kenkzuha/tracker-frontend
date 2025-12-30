import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private url = 'http://localhost:3000/api/v1';

  constructor(private http: HttpClient) {}

  checkBackend(){
    return this.http.get(`${this.url}/status`);
  }

  sendRegister(userData: any){
    return this.http.post(`${this.url}/register`, userData);
  }
}
