import { Component, OnInit } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';
import { MENU_ITEMS } from './pages-menu';
import { AuthService } from './_services/auth.service';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent implements OnInit {

  constructor(private authService: AuthService) {}
  menu: NbMenuItem[];
  ngOnInit() {
    let role: string = this.authService.decodedToken.role.toString();
    switch(role)
    {
      //Sales, Service, SalesAdmin, ServiceAdmin, FullAccess
      case "FullAccess": {
        this.menu = [
          {
            title: 'BaseInfo',
            icon: 'edit-2-outline',
            children: [
              {
                title: 'Supcust',
                link: '/pages/base-information/supcust',
              },
              {
                title: 'Product',
                link: '/pages/base-information/product',
              },
              {
                title: 'supcustGood',
                link: '/pages/base-information/supcustGood',
              },
              {
                title: 'User',
                link: '/pages/base-information/user',
              },
              {
                title: 'Country',
                link: '/pages/base-information/country',
              },
              {
                title: 'City',
                link: '/pages/base-information/city',
              },
            ]
          },
          {
            title: 'ToDo',
            icon: 'layout-outline',
            children: [
              {
                title: 'Dashboard',
                link: '/pages/project/index',
              },
              {
                title: 'ProjectType',
                link: '/pages/project/projectType',
              },
              {
                title: 'Task Define',
                link: '/pages/project/header',
              },
              {
                title: 'Task Report',
                link: '/pages/project/detail',
              },
              {
                title: 'Charges',
                link: '/pages/project/charges',
              },
            ]
          },
          {
            title: 'Correspondence',
            icon: 'layout-outline',
            children: [
              {
                title: 'Message',
                link: '/pages/document/messages',
              },
              {
                title: 'Files',
                link: '/pages/document/uploads',
              },
            ]
          },
        ];
      }
      break;
      case "SalesAdmin": {
        this.menu = [
          {
            title: 'BaseInfo',
            icon: 'edit-2-outline',
            children: [
              {
                title: 'Supcust',
                link: '/pages/base-information/supcust',
              },
              {
                title: 'Product',
                link: '/pages/base-information/product',
              },
              {
                title: 'supcustGood',
                link: '/pages/base-information/supcustGood',
              },
              {
                title: 'User',
                link: '/pages/base-information/user',
              },
              {
                title: 'Country',
                link: '/pages/base-information/country',
              },
              {
                title: 'City',
                link: '/pages/base-information/city',
              },
            ]
          },
          {
            title: 'ToDo',
            icon: 'layout-outline',
            children: [
              {
                title: 'Dashboard',
                link: '/pages/project/index',
              },
              {
                title: 'ProjectType',
                link: '/pages/project/projectType',
              },
              {
                title: 'Task',
                link: '/pages/project/header',
              },
              {
                title: 'Task Report',
                link: '/pages/project/detail',
              },
            ]
          },
        ];
      }
      break;
      case "ServiceAdmin": {
        this.menu = [
          {
            title: 'BaseInfo',
            icon: 'edit-2-outline',
            children: [
              {
                title: 'Supcust',
                link: '/pages/base-information/supcust',
              },
              {
                title: 'Product',
                link: '/pages/base-information/product',
              },
              {
                title: 'supcustGood',
                link: '/pages/base-information/supcustGood',
              },
              {
                title: 'User',
                link: '/pages/base-information/user',
              },
              {
                title: 'Country',
                link: '/pages/base-information/country',
              },
              {
                title: 'City',
                link: '/pages/base-information/city',
              },
            ]
          },
          {
            title: 'ToDo',
            icon: 'layout-outline',
            children: [
              {
                title: 'Dashboard',
                link: '/pages/project/index',
              },
              {
                title: 'ProjectType',
                link: '/pages/project/projectType',
              },
              {
                title: 'Task',
                link: '/pages/project/header',
              },
              {
                title: 'Task Report',
                link: '/pages/project/detail',
              },
            ]
          },
        ];
      }
      break;
      case "Sales": {
        this.menu = [
          {
            title: 'BaseInfo',
            icon: 'edit-2-outline',
            children: [
              {
                title: 'Supcust',
                link: '/pages/base-information/supcust',
              },
              {
                title: 'Product',
                link: '/pages/base-information/product',
              },
              {
                title: 'User',
                link: '/pages/base-information/user',
              },
              {
                title: 'Country',
                link: '/pages/base-information/country',
              },
              {
                title: 'City',
                link: '/pages/base-information/city',
              },
            ]
          },
          {
            title: 'ToDo',
            icon: 'layout-outline',
            children: [
              {
                title: 'Dashboard',
                link: '/pages/project/index',
              },
              {
                title: 'ProjectType',
                link: '/pages/project/projectType',
              },
              {
                title: 'Task',
                link: '/pages/project/header',
              },
              {
                title: 'Task Report',
                link: '/pages/project/detail',
              },
            ]
          },
        ];
      }
      break;
      case "Service": {
        this.menu = [
          {
            title: 'BaseInfo',
            icon: 'edit-2-outline',
            children: [
              {
                title: 'Supcust',
                link: '/pages/base-information/supcust',
              },
              {
                title: 'Product',
                link: '/pages/base-information/product',
              },
              {
                title: 'User',
                link: '/pages/base-information/user',
              },
              {
                title: 'Country',
                link: '/pages/base-information/country',
              },
              {
                title: 'City',
                link: '/pages/base-information/city',
              },
            ]
          },
          {
            title: 'ToDo',
            icon: 'layout-outline',
            children: [
              {
                title: 'Dashboard',
                link: '/pages/project/index',
              },
              {
                title: 'ProjectType',
                link: '/pages/project/projectType',
              },
              {
                title: 'Task',
                link: '/pages/project/header',
              },
              {
                title: 'Task Report',
                link: '/pages/project/detail',
              },
            ]
          },
        ];
      }
      break;
    }
  }
  //menu = MENU_ITEMS;

}
