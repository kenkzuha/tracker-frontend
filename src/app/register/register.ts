import { Component } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { Auth } from '../auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  constructor(private authService: Auth){}
  onSubmit(form: NgForm){
    if(form.valid){
      console.log('Form Data: ', form.value);
    }
    this.authService.sendRegister(form.value).subscribe({
      next: (response) => {
        console.log('Backend Response: ', response);
        alert('Register Success');
      },
      error: (error) => {
        console.log('Backend Error: ', error);
        alert('Register Failed');
      } 
    });
  }
}
