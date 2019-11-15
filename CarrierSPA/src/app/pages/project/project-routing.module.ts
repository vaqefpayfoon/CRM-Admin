import { Routes, RouterModule } from "@angular/router";
import { NgModule } from '@angular/core';
import { ProjectComponent } from './project.component';
import { ProjectTypeComponent } from './project-type/project-type.component';
import { ProjectTypeFormComponent } from './project-type-form/project-type-form.component';
import { ProjectHeaderComponent } from './project-header/project-header.component';
import { ProjectHeaderFormComponent } from './project-header-form/project-header-form.component';
import { ProjectTypeResolver } from '../_resolvers/project-type.resolver';
import { ProjectHeaderResolver } from '../_resolvers/project-header.resolver';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { ProjectDetailResolver } from '../_resolvers/project-detail.resolver';
import { ProjectFinanceResolver } from '../_resolvers/project-finance.resolver';
import { ProjectDetailFormComponent } from './project-detail-form/project-detail-form.component';
import { IndexComponent } from './index/index.component';
import { ProjectHeadersResolver } from '../_resolvers/project-headers.resolver';
import { SmartTableComponent } from './smart-table/smart-table.component';
import { ChargeComponent } from './charge/charge.component';
import { ChargeFormComponent } from './charge-form/charge-form.component';
import { ChargeResolver } from '../_resolvers/charge.resolver';

const routes: Routes = [
  {
    path: '',
    component: ProjectComponent,
    children: [
    {path: 'index', component: IndexComponent, resolve: {projectHeaders: ProjectHeadersResolver}},
    {path: 'projectType', component: ProjectTypeComponent},
    {path: 'projectType/:id', component: ProjectTypeFormComponent, resolve: {projectType: ProjectTypeResolver}},
    {path: 'header', component: ProjectHeaderComponent},
    {path: 'header/:id', component: ProjectHeaderFormComponent, resolve: {projectHeader: ProjectHeaderResolver}},
    {path: 'detail', component: ProjectDetailComponent},
    {path: 'detail/:id', component: ProjectDetailFormComponent, resolve: {projectDetail: ProjectDetailResolver,
      projectFinance: ProjectFinanceResolver}},
    {path: 'charge', component: ChargeComponent},
    {path: 'charge/:id', component: ChargeFormComponent, resolve: {charge: ChargeResolver}},
  ]},
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectRoutingModule {
}
