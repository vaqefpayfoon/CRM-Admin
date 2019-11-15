import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ModelsAttribute } from '../_models/modelsAttribute';
import { AttributeService } from '../_services/attribute.service';
import { catchError } from 'rxjs/operators';


@Injectable({ providedIn: 'root' })

export class ModelsAttributeResolver implements Resolve<ModelsAttribute[]> {

  constructor(private attributeService: AttributeService, private router: Router) {}
  resolve(route: ActivatedRouteSnapshot): Observable<ModelsAttribute[]> {
    if(route.params['id'] != -1)
      return this.attributeService.getAttributes(route.params['id']).pipe(
        catchError(error => {
          console.log(error)
            return of(null);
        })
    );
    return null;
  }
}
