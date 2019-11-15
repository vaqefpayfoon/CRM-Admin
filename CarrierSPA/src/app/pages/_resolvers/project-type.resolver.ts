import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ProjectType } from '../_models/project-type';
import { ProjectTypeService } from '../_services/project-type.service';


@Injectable({ providedIn: 'root' })

export class ProjectTypeResolver implements Resolve<ProjectType> {

  constructor(private projectTypeService: ProjectTypeService, private router: Router) {}
  resolve(route: ActivatedRouteSnapshot): Observable<ProjectType> | Promise<ProjectType> | ProjectType {
    if(route.params['id'] != -1)
      return this.projectTypeService.getProjectType(route.params['id'], 'id');
    return null;
  }
}
