import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Supcust } from '../_models/supcust';
import { SupcustService } from '../_services/supcust.service';


@Injectable({ providedIn: 'root' })

export class SupcustResolver implements Resolve<Supcust> {

  constructor(private supcustService: SupcustService, private router: Router) {}
  resolve(route: ActivatedRouteSnapshot): Observable<Supcust> | Promise<Supcust> | Supcust {
    if(route.params['id'] != -1)
      return this.supcustService.getSupcust(route.params['id'], 'id');
    return null;
  }
}
