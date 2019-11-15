import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ProjectService } from '../_services/project.service';


@Injectable({ providedIn: 'root' })

export class ProjectFinanceResolver implements Resolve<any> {

  constructor(private projectService: ProjectService, private router: Router) {}
  resolve(route: ActivatedRouteSnapshot): Observable<any> | Promise<any> | any {
    if(route.params['id'] != -1)
      return this.projectService.getUsersProject(route.params['id'], 'finance');
    return null;
  }
}
