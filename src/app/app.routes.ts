import { Routes } from '@angular/router';
import { Home } from './home/home.component';
import { Signup } from './signup/signup.component';
import { Login } from './login/login.component';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'signup', component: Signup },
    { path: 'login', component: Login }
];

