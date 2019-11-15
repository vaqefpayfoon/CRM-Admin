import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../_models/user';
import { environment } from '../../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  baseUrl = environment.apiUrl + 'auth/';
  userUrl = environment.apiUrl + 'user/';
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  currentUser: User;
  photoUrl = new BehaviorSubject<string>('../../assets/user.png');
  currentPhotoUrl = this.photoUrl.asObservable();
  userId: any;
  constructor(private http: HttpClient) {}

  changeMemberPhoto(photoUrl: string) {
    this.photoUrl.next(photoUrl);
  }

  login(model: any) {
    return this.http.post(this.baseUrl + 'login', model).pipe(
      map((response: any) => {
        const user = response;
        if (user) {
          localStorage.setItem('token', user.token);
          localStorage.setItem('user', JSON.stringify(user.user));
          this.decodedToken = this.jwtHelper.decodeToken(user.token);
          this.currentUser = user.user;
          this.changeMemberPhoto(this.currentUser.photoUrl);
          console.log(this.decodedToken);
        }
      })
    );
  }

  login2(model: any) {
    return this.http.post(this.baseUrl + 'login', model).subscribe(
      (response) => {
         console.log(response);
      }
    );
  }

  register(user: User) {
    return this.http.post(this.baseUrl + 'register', user, {observe: 'response'}).pipe(map(
      (response: any) => {
        const createdUser = response.body;
         this.userId = createdUser.id;
      }
    ));
  }

  editProfile(user: User) {
    return this.http.post(this.userUrl + 'editProfile', user, {observe: 'response'}).pipe(map(
      (response: any) => {
        const user = response;
        if (user) {
          this.currentUser = user.user;
        }
      }
    ));
  }

  resetPassword(user: any) {
    return this.http.post(this.userUrl + 'resetPassword', user, {observe: 'response'}).pipe(map(
      (response: any) => {
        const message = response;
        if (message) {
          console.log(message);
        }
      }
    ));
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }
  getUser(id): Observable<User> {
    return this.http.get<User>(this.baseUrl + id);
  }
}
