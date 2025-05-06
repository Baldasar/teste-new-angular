import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuardHome } from './core/guard/auth-home.guard';
import { RegisterComponent } from './pages/register/register.component';
import { AuthGuardLogin } from './core/guard/auth-login.guard';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canMatch: [AuthGuardLogin] },
  { path: 'register', component: RegisterComponent, canMatch: [AuthGuardLogin] },
  { path: 'home', component: HomeComponent, canMatch: [AuthGuardHome]}
];
