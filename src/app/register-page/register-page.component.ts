import { Component, signal } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { CommonModule, DecimalPipe } from '@angular/common';
import { interval, lastValueFrom } from 'rxjs';
import { RegisterData, RegisterResponse } from '../interfaces/register.interface';

@Component({
  selector: 'app-register-page',
  imports: [CommonModule, FormsModule, DecimalPipe],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.scss',
})
export class RegisterPage {
  error = '';
  users = signal(1000);
  registerUser: RegisterData = {
    user: '',
    email: '',
    pass: '',
  };

  constructor(private authService: AuthService) { }

  ngOnInit() {
    interval(1000).subscribe(() => {
      this.users.set(this.users() + Math.round(Math.random() * 1000));
    })

  }

  async register() {
    const registerUser = this.registerUser;
    if (registerUser.user && registerUser.email && registerUser.pass && registerUser.pass.length > 8) {
      try {
        const resp = await this.authService.register(registerUser);
        if (resp.data) {

        }
      } catch (e) {
        this.error = 'Unable to register';
        // display this error in the html.
      }
    }
  }
}
