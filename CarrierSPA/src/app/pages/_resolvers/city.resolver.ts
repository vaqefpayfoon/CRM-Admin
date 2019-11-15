import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { City } from '../_models/city';
import { CityService } from '../_services/city.service';

@Injectable({ providedIn: 'root' })
export class CityResolver implements Resolve<City> {

  constructor(private cityService: CityService, private router: Router) {}
  resolve(route: ActivatedRouteSnapshot): Observable<City> | Promise<City> | City {
    if(route.params['id'] != -1)
      return this.cityService.getCity(route.params['id'], 'id');
    return null;
  }
}

