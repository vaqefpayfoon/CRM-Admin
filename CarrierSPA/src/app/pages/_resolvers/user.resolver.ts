import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { UserService } from '../_services/user.service';


@Injectable({ providedIn: 'root' })

export class UserResolver implements Resolve<User> {

  constructor(private userService: UserService, private router: Router) {}
  resolve(route: ActivatedRouteSnapshot): Observable<User> | Promise<User> | User {
    if(route.params['id'] != -1)
      return this.userService.getUser(route.params['id'], 'id');
    return null;
  }
}
