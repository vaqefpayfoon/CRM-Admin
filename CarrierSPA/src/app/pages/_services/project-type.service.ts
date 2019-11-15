import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { PaginatedResult } from '../_models/pagination';
import { environment } from '../../../environments/environment';
import { StringModel } from '../_models/dropDown';
import { ProjectType } from '../_models/project-type';

const httpOptions = {
  observe: 'response',
  headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token')})
};
@Injectable({
  providedIn: 'root'
})
export class ProjectTypeService {

  baseUrl = environment.apiUrl + 'projectType';

  constructor(private http: HttpClient) {}
  projectType: ProjectType;
  ProjectTypes: ProjectType[];

  getprojectTypes(): Observable<ProjectType[]> {
    return this.http.get<ProjectType[]>(this.baseUrl + "/getprojectTypes", { observe: 'response',
    headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token')})})
    .pipe(map((response: any) => { this.ProjectTypes = response.body;
      return this.ProjectTypes;
    }));
  }

  getAllprojectTypes(page?, itemsPerPage?, userParams?): Observable<PaginatedResult<ProjectType[]>> {
    const paginatedResult: PaginatedResult<ProjectType[]> = new PaginatedResult<ProjectType[]>();

    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }
    if (userParams != null) {
      params = params.append('orderBy', userParams.orderBy);
    }
    return this.http.get<ProjectType[]>(this.baseUrl + "/getProjectTypes", { observe: 'response', params,
    headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token')})})
    .pipe(
      map(response => {
        paginatedResult.result = response.body;
        if (response.headers.get('Pagination') != null) {
          paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
        }
        return paginatedResult;
      })
    );
  }

  getProjectType(key, field) {
    let params = new HttpParams();
    params = params.append('key', key);
    params = params.append('field', field);
    return this.http.get<ProjectType>(this.baseUrl + "/getProjectType", { observe: 'response', params,
    headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token')})}).pipe(
      map((response: any) => {
      this.projectType = response.body;
      return this.projectType;
    }));
  }

  test(model: ProjectType) {
    let stringModel: StringModel = {id: '', name: 'model'};
    return this.http.post(this.baseUrl + '/default', stringModel, {observe: 'response',
    headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token')})}).pipe(
      map((response: any) => {
        return response.body;
      })
    );
  }
  projectTypeId: any;
  saveProjectType(model: ProjectType) {
    return this.http.post(this.baseUrl + '/saveProjectType', model, {observe: 'response',
    headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token')})}).pipe(
      map((response: any) => {
        const model = response.body;
         this.projectTypeId = model.id;
      })
    );
  }

  updateProjectType(model: ProjectType) {
    return this.http.post(this.baseUrl + '/updateProjectType', model, {observe: 'response',
    headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token')})}).pipe(
      map((response: any) => {
        return response.body;
      })
    );
  }

  deleteProjectType(name: StringModel) {
    return this.http.post(this.baseUrl + '/deleteProjectType', name, {observe: 'response',
    headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token')})}).pipe(
      map((response: any) => {
        return response.body;
      })
    );
  }
}
