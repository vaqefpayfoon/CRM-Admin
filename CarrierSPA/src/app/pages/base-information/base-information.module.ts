import { NgModule } from "@angular/core";
import { CityComponent } from './city/city.component';
import { Ng2CompleterModule } from "ng2-completer";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BaseRoutingModule } from './base-routing.module';
import { NbCardModule, NbButtonModule, NbAlertModule, NbCalendarModule, NbSelectModule, NbDatepickerModule } from '@nebular/theme';
import { CityFormComponent } from './cityForm/cityForm.component';
import { BaseComponent } from './base.component';
import { CityResolver } from '../_resolvers/city.resolver';
import { CommonModule } from '@angular/common';
import { CountryComponent } from './country/country.component';
import { CountryFormComponent } from './country-form/country-form.component';
import { CountryResolver } from '../_resolvers/country.resolver';
import { UserComponent } from './user/user.component';
import { UserFormComponent } from './user-form/user-form.component';
import { UserResolver } from '../_resolvers/user.resolver';
import { FileUploadModule } from 'ng2-file-upload';
import { ProductComponent } from './product/product.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { SupcustFormComponent } from './supcust-form/supcust-form.component';
import { SupcustComponent } from './supcust/supcust.component';
import { ProductResolver } from '../_resolvers/product.resolver';
import { SupcustResolver } from '../_resolvers/supcust.resolver';
import { ModelsAttributeResolver } from '../_resolvers/attribute.resolver';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from '../_guards/auth.guard';
import { AuthService } from '../_services/auth.service';
import { UserService } from '../../@core/mock/users.service';
import { CityService } from '../_services/city.service';
import { ProductService } from '../_services/product.service';
import { SupcustService } from '../_services/supcust.service';
import { SupcustGoodComponent } from './supcust-good/supcust-good.component';
import { SupcustGoodFormComponent } from './supcust-good-form/supcust-good-form.component';
import { SupcustGoodResolver } from '../_resolvers/supcust-good.resolver';

@NgModule({
  imports: [
    Ng2CompleterModule, FormsModule, BaseRoutingModule, NbCardModule, NbButtonModule, ReactiveFormsModule,
     CommonModule, NbAlertModule, NbCalendarModule, NbSelectModule, NbDatepickerModule.forRoot(), FileUploadModule,
  ],
  declarations: [
    BaseComponent, CityComponent, CityFormComponent, CountryComponent, CountryFormComponent, UserComponent, UserFormComponent, ProductComponent, ProductFormComponent, SupcustFormComponent, SupcustComponent, LoginComponent, SupcustGoodComponent, SupcustGoodFormComponent
  ],
  providers: [
    CityResolver, CountryResolver, UserResolver, ProductResolver, SupcustResolver, ModelsAttributeResolver, AuthGuard, AuthService, UserService, CityService, ProductService, SupcustService, SupcustGoodResolver
  ]
})
export class BaseInformationModule { }
