import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { Auth } from '../auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})

export class Login {
  private formBuilder = inject(FormBuilder);
  private authService = inject(Auth)
  private router = inject(Router);

  errorMessage = signal('');
  isLoading = signal(false);
  successMessage = signal('');

  loginData = this.formBuilder.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  onSubmit(){
    if(this.loginData.valid){
      this.isLoading.set(true);
      this.errorMessage.set('');
      this.successMessage.set('');

      this.authService.login(this.loginData.value).subscribe({
        next: (res) => {
          console.log(res.message);
          this.successMessage.set(res.message)
          this.isLoading.set(false);
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          this.errorMessage.set(err.error?.message || 'Invalid Credentials');
          this.isLoading.set(false);
        },
      });
    }
  }
}
