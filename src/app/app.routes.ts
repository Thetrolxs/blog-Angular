import { Routes } from '@angular/router';
import { LoginComponent } from './_page/login/login.component';
import { RegisterComponent } from './_page/register/register.component';
import { PostsComponent } from './_page/posts/posts.component';
import { loginGuard } from './_guard/login.guard';

export const routes: Routes = [
    { path: '', redirectTo: '', pathMatch: 'full'},
    { path: '', component: LoginComponent},
    { path: 'register', component: RegisterComponent},
    { path: 'posts', component: PostsComponent, canActivate: [loginGuard]}

];
