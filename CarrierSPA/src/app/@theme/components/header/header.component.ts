import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService, NbIconLibraries } from '@nebular/theme';

import { UserData } from '../../../@core/data/users';
import { LayoutService } from '../../../@core/utils';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { UserService } from '../../../pages/_services/user.service';
import { User, UserDto } from '../../../pages/_models/user';
import { FileStore } from '../../../pages/_models/fileStore';
import { AuthService } from '../../../pages/_services/auth.service';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  user: User;
  userDto: UserDto;
  fileStore: FileStore;

  themes = [
    {
      value: 'dark',
      name: 'Dark',
    },
    {
      value: 'default',
      name: 'Light',
    },
    {
      value: 'cosmic',
      name: 'Cosmic',
    },
    {
      value: 'corporate',
      name: 'Corporate',
    },
  ];

  currentTheme = 'dark';
  evaIcons = [];
  userMenu = [ { title: 'Profile' }, { title: 'Log out' } ];

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private themeService: NbThemeService,
              private userService: UserService,
              private layoutService: LayoutService,
              public authService: AuthService, private router: Router) {
  }
  photoUrl: string;
  jwtHelper = new JwtHelperService();
  ngOnInit() {
    this.currentTheme = this.themeService.currentTheme;
    this.currentTheme = 'dark';
    // if(this.loggedIn()) {
    //   const token = localStorage.getItem('token');
    //   const user: User = JSON.parse(localStorage.getItem('user'));
    //   if (token) {
    //     this.authService.decodedToken = this.jwtHelper.decodeToken(token);
    //   }
    //   if (user) {
    //     this.authService.currentUser = user;
    //     this.authService.changeMemberPhoto(user.photoUrl);
    //   }
    // } else {
    //   this.router.navigate(['/pages/base-information/login']);
    // }
    this.themeService.changeTheme('dark');
    this.themeService.changeTheme('cosmic');
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  navigateHome() {
    this.router.navigate(['pages/project/index']);
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
    this.router.navigate(['/pages/base-information/login']);
  }

  markAsRead() {

  }

  messages() {

  }

}
