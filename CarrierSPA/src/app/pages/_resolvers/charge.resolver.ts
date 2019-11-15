import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Charge } from '../_models/charge';
import { ChargeService } from '../_services/charge.service';


@Injectable({ providedIn: 'root' })

export class ChargeResolver implements Resolve<Charge> {

  constructor(private chargeService: ChargeService, private router: Router) {}
  resolve(route: ActivatedRouteSnapshot): Observable<Charge> | Promise<Charge> | Charge {
    if(route.params['id'] != -1)
      return this.chargeService.getCharge(route.params['id']);
    return null;
  }
}
