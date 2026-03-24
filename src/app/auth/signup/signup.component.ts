import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Auth } from '../auth.service';

function passwordMatchValidator(control: AbstractControl) {
  const password = control.get('password')?.value;
  const confirmPass = control.get('confirmPass')?.value;
  return password === confirmPass ? null : { passwordMismatch: true };
}

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, MatIconModule, MatInputModule, MatFormFieldModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class Signup {
  isDark = true;
  hidePassword = true;
  hideConfirm = true;
  isLoading = false;
  errorMessage = '';
  signupForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private authService: Auth) {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPass: ['', Validators.required],
    }, { validators: passwordMatchValidator });
  }

  ngOnInit() {
    if(this.authService.isAuthenticated()){
      this.router.navigate(['/dashboard'])
    }
  }

  toggleTheme(): void { this.isDark = !this.isDark; }
  togglePassword(): void { this.hidePassword = !this.hidePassword; }
  toggleConfirm(): void { this.hideConfirm = !this.hideConfirm; }

  onSubmit(): void {
    if (this.signupForm.invalid) return;

    this.isLoading = true;
    this.errorMessage = '';

    const { confirmPass, ...signupData } = this.signupForm.value;

    this.authService.signup(signupData).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/login']);
      },
      error: (err: any) => {
        console.log('error');
        this.isLoading = false;
        this.errorMessage = err.error.message || 'Signup failed';
      }
    });
  }
}