import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit {

  saveState: string = "0";
  model: any = {};
  photoUrl: string;

  constructor(public authService: AuthService,
      private router: Router) { }

  ngOnInit() {
    this.authService.currentPhotoUrl.subscribe(photoUrl => this.photoUrl = photoUrl);
  }

  login() {
    this.authService.login(this.model).subscribe(next => {
      this.saveState = "1";
    }, error => {
      this.saveState = "Login Faild" + error.error;
      this.loggedIn();
    }, () => {
      this.router.navigate(['/pages/project/index']);
    });
    //this.authService.decodedToken.role
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !!token;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.authService.decodedToken = null;
    this.authService.currentUser = null;

    this.router.navigate(['/pages/base-information/logout']);
  }

}
