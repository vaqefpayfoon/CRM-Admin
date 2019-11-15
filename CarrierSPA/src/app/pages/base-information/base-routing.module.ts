import { Routes, RouterModule } from "@angular/router";
import { CityComponent } from './city/city.component';
import { NgModule } from '@angular/core';
import { CityFormComponent } from './cityForm/cityForm.component';
import { BaseComponent } from './base.component';
import { CityResolver } from '../_resolvers/city.resolver';
import { CountryComponent } from './country/country.component';
import { CountryFormComponent } from './country-form/country-form.component';
import { CountryResolver } from '../_resolvers/country.resolver';
import { UserComponent } from './user/user.component';
import { UserFormComponent } from './user-form/user-form.component';
import { UserResolver } from '../_resolvers/user.resolver';
import { ProductComponent } from './product/product.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { SupcustComponent } from './supcust/supcust.component';
import { SupcustFormComponent } from './supcust-form/supcust-form.component';
import { ProductResolver } from '../_resolvers/product.resolver';
import { SupcustResolver } from '../_resolvers/supcust.resolver';
import { ModelsAttributeResolver } from '../_resolvers/attribute.resolver';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from '../_guards/auth.guard';
import { SupcustGoodComponent } from './supcust-good/supcust-good.component';
import { SupcustGoodFormComponent } from './supcust-good-form/supcust-good-form.component';
import { SupcustGoodResolver } from '../_resolvers/supcust-good.resolver';

const routes: Routes = [
  {path: '', component: BaseComponent,
    children: [
    {
      path: '',
      redirectTo: 'login'
    },
    {path: 'login', component: LoginComponent},
    {path: 'city', component: CityComponent, canActivate: [AuthGuard], children: [
      //{path: ':id', component: CityFormComponent, resolve: {city: CityResolver}},
    ]},
    {path: 'city/:id', component: CityFormComponent, canActivate: [AuthGuard], resolve: {city: CityResolver}},
    {path: 'country', component: CountryComponent, canActivate: [AuthGuard]},
    {path: 'country/:id', component: CountryFormComponent, resolve: {country: CountryResolver}},
    {path: 'user', component: UserComponent, canActivate: [AuthGuard]},
    {path: 'user/:id', component: UserFormComponent, canActivate: [AuthGuard], resolve: {user: UserResolver}},
    {path: 'product', component: ProductComponent, canActivate: [AuthGuard]},
    {path: 'product/:id', component: ProductFormComponent, canActivate: [AuthGuard], resolve: {product: ProductResolver}},
    {path: 'supcust', component: SupcustComponent, canActivate: [AuthGuard]},
    {path: 'supcust/:id', component: SupcustFormComponent, canActivate: [AuthGuard], resolve: {supcust: SupcustResolver, attributes: ModelsAttributeResolver}},
    {path: 'supcustGood', component: SupcustGoodComponent, canActivate: [AuthGuard]},
    {path: 'supcustGood/:id', component: SupcustGoodFormComponent, canActivate: [AuthGuard], resolve: {supcustGood: SupcustGoodResolver, attributes: ModelsAttributeResolver}},
  ]},
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BaseRoutingModule {
}
