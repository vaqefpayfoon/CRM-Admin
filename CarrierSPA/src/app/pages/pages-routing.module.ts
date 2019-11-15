import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { IndexComponent } from './project/index/index.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'base-information',
      loadChildren: () => import('./base-information/base-information.module')
        .then(m => m.BaseInformationModule),
    },
    {
      path: 'project',
      loadChildren: () => import('./project/project.module')
        .then(m => m.ProjectModule),
    },
    {
      path: 'miscellaneous',
      loadChildren: () => import('./miscellaneous/miscellaneous.module')
        .then(m => m.MiscellaneousModule),
    },
    {
      path: '',
      redirectTo: 'project/index'
      // loadChildren: () => import('./project/project.module')
      //   .then(m => m.ProjectModule),
    },
    {
      path: '**',
      component: NotFoundComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
