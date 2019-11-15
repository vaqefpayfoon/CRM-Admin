import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { User } from '../_models/user';

@Injectable({providedIn: 'root'})
export class AuthorizeGuard implements CanActivate {
  constructor(private authService: AuthService) { }

  canActivate() {
    if(this.authService.loggedIn()) {
      const user: User = JSON.parse(localStorage.getItem('user'));
      if(user.userRole == '2')
        return false;
      return true;
    }
    else{
      console.log('You have not authorized');
      return false;
    }
  }
}
