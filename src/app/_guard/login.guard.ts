import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_service/auth.service';

@Injectable({
  providedIn: 'root',
})
export class loginGuard{
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(){
      if(this.authService.isAuth()) {
        return true;
      } else {
        this.router.navigate(['/'])
        return false;
      }
  }
}