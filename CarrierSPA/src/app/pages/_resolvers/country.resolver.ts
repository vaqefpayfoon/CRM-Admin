import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CityService } from '../_services/city.service';
import { Country } from '../_models/country';

@Injectable({ providedIn: 'root' })

export class CountryResolver implements Resolve<Country> {

  constructor(private cityService: CityService, private router: Router) {}
  resolve(route: ActivatedRouteSnapshot): Observable<Country> | Promise<Country> | Country {
    if(route.params['id'] != -1)
      return this.cityService.getCountry(route.params['id'], 'id');
    return null;
  }
}
