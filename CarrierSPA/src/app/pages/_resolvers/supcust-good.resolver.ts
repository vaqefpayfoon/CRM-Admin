import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SupcustGood } from '../_models/SupcustGood';
import { SupcustGoodService } from '../_services/supcustGood.service';


@Injectable({ providedIn: 'root' })

export class SupcustGoodResolver implements Resolve<SupcustGood> {

  constructor(private supcustGoodService: SupcustGoodService, private router: Router) {}
  resolve(route: ActivatedRouteSnapshot): Observable<SupcustGood> | Promise<SupcustGood> | SupcustGood {
    if(route.params['id'] != -1)
      return this.supcustGoodService.getSupcustGoodId(route.params['id']);
    return null;
  }
}
