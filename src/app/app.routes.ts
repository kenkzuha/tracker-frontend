import { Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard.component';
import { Signup } from './signup/signup.component';
import { Login } from './login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { GuestGuard } from './auth/guest.guard';
import { Home } from './home/home.component';

export const routes: Routes = [
    { path: '', component: Home, canActivate: [] },
    { path: 'dashboard', component: Dashboard, canActivate: [AuthGuard]},
    { path: 'signup', component: Signup, canActivate: [GuestGuard] },
    { path: 'login', component: Login, canActivate: [GuestGuard] }
];

