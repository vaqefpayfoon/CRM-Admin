import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
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
