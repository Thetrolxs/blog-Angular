import { Routes } from '@angular/router';
import { LoginComponent } from './_page/login/login.component';
import { RegisterComponent } from './_page/register/register.component';

export const routes: Routes = [
    { path: '', redirectTo: '', pathMatch: 'full'},
    { path: '', component: LoginComponent},
    { path: 'register', component: RegisterComponent}
];
