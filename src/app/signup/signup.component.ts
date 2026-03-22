import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Auth } from '../auth/auth.service'; 
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';


function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');
  if(password?.value !== confirmPassword?.value){
    return { passwordMismatch: true }; 
  }

  return null
}

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
  standalone: true,
})

export class Signup {
  private router = inject(Router);
  private formBuilder = inject(FormBuilder);
  private authService = inject(Auth)      
  signupData = this.formBuilder.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
  }, { validators: passwordMatchValidator });

  onSubmit() {
    if(this.signupData.valid){
      this.authService.signup(this.signupData.value).subscribe({
        next: (response) => {
          console.log('Signup successful', response);
          setTimeout(() => {
            this.router.navigate(['/login']);
          })
        },
        error: (error) => console.error('Signup failed', error)
      });
    }
  }
}
