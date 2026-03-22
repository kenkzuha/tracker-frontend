import { Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard.component';
import { Signup } from './auth/signup/signup.component';
import { Login } from './auth/login/login.component';
import { AuthGuard } from './auth/core/auth.guard';
import { Home } from './home/home.component';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'dashboard', component: Dashboard, canActivate: [AuthGuard]},
    { path: 'signup', component: Signup },
    { path: 'login', component: Login }
];

