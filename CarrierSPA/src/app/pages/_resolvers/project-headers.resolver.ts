import {Injectable} from '@angular/core';
import {Resolve, Router, ActivatedRouteSnapshot} from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ProjectHeader } from '../_models/project-header';
import { ProjectService } from '../_services/project.service';

@Injectable()
export class ProjectHeadersResolver implements Resolve<ProjectHeader[]> {
    pageNumber = 1;
    pageSize = 5;

    constructor(private projectService: ProjectService, private router: Router) {}

    resolve(route: ActivatedRouteSnapshot): Observable<ProjectHeader[]> {
        return this.projectService.getAllProjectHeaders(this.pageNumber, this.pageSize)
        .pipe(catchError(error => {
                this.router.navigate(['/pages/base-information/login']);
                return of(null);
            })
        );
    }
}
