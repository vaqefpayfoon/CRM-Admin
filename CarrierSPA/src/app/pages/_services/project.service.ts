import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { PaginatedResult } from '../_models/pagination';
import { environment } from '../../../environments/environment';
import { StringModel } from '../_models/dropDown';
import { FileStore } from '../_models/fileStore';
import { ProjectHeader } from '../_models/project-header';
import { ProjectDetail } from '../_models/project-detail';
import { ProjectFinance } from '../_models/project-finance';
import { OrderProfitChartSummary } from '../../@core/data/orders-profit-chart';


@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  baseUrl = environment.apiUrl + 'usersProject';
  uploadUrl = environment.apiUrl + 'storefile';

  constructor(private http: HttpClient) {}
  projectHeader: ProjectHeader;
  projectHeaders: ProjectHeader[];
  projectDetail: ProjectDetail;
  projectDetails: ProjectDetail[];
  projectFinance: ProjectFinance;
  projectFinances: ProjectFinance[];
  fileStore: FileStore;

  getProjectHeaders(): Observable<ProjectHeader[]> {
    return this.http.get<ProjectHeader[]>(this.baseUrl + "/getProjectHeaders", { observe: 'response',
    headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token')})})
    .pipe(map((response: any) => { this.projectHeaders = response.body;
      return this.projectHeaders;
    }));
  }

  getAllProjectHeaders(page?, itemsPerPage?, userParams?): Observable<PaginatedResult<ProjectHeader[]>> {
    const paginatedResult: PaginatedResult<ProjectHeader[]> = new PaginatedResult<ProjectHeader[]>();

    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }
    if (userParams != null) {
      params = params.append('orderBy', userParams.orderBy);
    }
    return this.http.get<ProjectHeader[]>(this.baseUrl + "/getUsersProjects", { observe: 'response', params,
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
  projectId: any;
  getUsersProjectId(projectTypeId, supcustId, productId, userId) {
    let params = new HttpParams();
    params = params.append('projectTypeId', projectTypeId);
    params = params.append('supcustId', supcustId);
    params = params.append('productId', productId);
    params = params.append('userId', userId);
    return this.http.get<ProjectHeader>(this.baseUrl + "/getUsersProjectId", { observe: 'response', params,
    headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token')})}).pipe(
      map((response: any) => {
      this.projectId = response.body;
      return this.projectId;
    }));
  }

  getUsersProject(id, type) {
    let params = new HttpParams();
    params = params.append('id', id);
    params = params.append('type', type);
    return this.http.get<any>(this.baseUrl + "/getUsersProject", { observe: 'response', params,
    headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token')})}).pipe(
      map((response: any) => {
      switch(type)
      {
        case "header": {
          this.projectHeader = response.body;
          return this.projectHeader;
        }
        case "detail": {
          this.projectDetail = response.body;
          return this.projectDetail;
        }
        case "finance": {
          this.projectFinance = response.body;
          return this.projectFinance;
        }
      }
    }));
  }
  ProjectHeaderId: any;
  saveHeaderProject(model: ProjectHeader) {
    return this.http.post(this.baseUrl + '/saveHeaderProject', model, {observe: 'response',
    headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token')})}).pipe(
      map((response: any) => {
        const model = response.body;
         this.ProjectHeaderId = model.id;
      })
    );
  }

  updateHeaderProject(model: ProjectHeader) {
    return this.http.post(this.baseUrl + '/updateHeaderProject', model, {observe: 'response',
    headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token')})}).pipe(
      map((response: any) => {
        return response.body;
      })
    );
  }

  deleteUsersProject(id) {
    let model: StringModel = {id: id, name:''};
    return this.http.post(this.baseUrl + '/deleteUsersProject', model, {observe: 'response',
    headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token')})}).pipe(
      map((response: any) => {
        return response.body;
      })
    );
  }

  updateDetailProject(model: ProjectDetail) {
    return this.http.post(this.baseUrl + '/updateDetailProject', model, {observe: 'response',
    headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token')})}).pipe(
      map((response: any) => {
        return response.body;
      })
    );
  }

  updateFinanceProject(model: ProjectFinance) {
    return this.http.post(this.baseUrl + '/updateFinanceProject', model, {observe: 'response',
    headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token')})}).pipe(
      map((response: any) => {
        return response.body;
      })
    );
  }

  getFile(relatedObjectId: any) {
    let params = new HttpParams();
    params = params.append('model', relatedObjectId);
    return this.http.get<FileStore>(this.uploadUrl + "/getFile", { observe: 'response', params,
    headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token')})})
    .pipe(map((response: any) => {
      this.fileStore = response.body;
      return this.fileStore;
    }));
  }
  profits: number[];
  private summary2: OrderProfitChartSummary[] = [];
  getProjectsProfit(): Observable<OrderProfitChartSummary[]> {
    return this.http.get<OrderProfitChartSummary[]>(this.baseUrl + "/getProjectsProfit", { observe: 'response',
    headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token')})})
    .pipe(map((response: any) => { this.profits = response.body;
      this.summary2 = [
        {
          title: 'Marketplace',
          value: this.profits[0],
        },
        {
          title: 'Last Month',
          value: this.profits[1],
        },
        {
          title: 'Last Week',
          value: this.profits[2],
        },
        {
          title: 'Today',
          value: this.profits[3],
        },
      ];
      return this.summary2;
    }));
  }
}
