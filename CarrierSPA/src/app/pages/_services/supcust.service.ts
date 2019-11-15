import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { PaginatedResult } from '../_models/pagination';
import { environment } from '../../../environments/environment';
import { StringModel, NameModel } from '../_models/dropDown';
import { FileStore } from '../_models/fileStore';
import { Supcust } from '../_models/supcust';

@Injectable({
  providedIn: 'root'
})
export class SupcustService {

  baseUrl = environment.apiUrl + 'supcust';
  uploadUrl = environment.apiUrl + 'storefile';

  constructor(private http: HttpClient) {}
  supcust: Supcust;
  supcusts: Supcust[];
  fileStore: FileStore;
  getSupcusts(): Observable<Supcust[]> {
    return this.http.get<Supcust[]>(this.baseUrl + "/getSupcusts", { observe: 'response'})
    .pipe(map((response: any) => { this.supcusts = response.body;
      return this.supcusts;
    }));
  }

  getAllSupcusts(page?, itemsPerPage?, userParams?): Observable<PaginatedResult<Supcust[]>> {
    const paginatedResult: PaginatedResult<Supcust[]> = new PaginatedResult<Supcust[]>();

    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }
    if (userParams != null) {
      params = params.append('orderBy', userParams.orderBy);
    }
    return this.http.get<Supcust[]>(this.baseUrl + "/getSupcusts", { observe: 'response', params,
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

  getSupcust(key, field) {
    let params = new HttpParams();
    params = params.append('key', key);
    params = params.append('field', field);
    return this.http.get<Supcust>(this.baseUrl + "/getSupcust", { observe: 'response', params,
    headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token')})}).pipe(
      map((response: any) => {
      const createdSupcust = response.body;
      this.supcust = createdSupcust.supcustDto;
      return this.supcust;
    }));
  }

  def() {
    this.http.get(this.baseUrl + '/default').subscribe((res)=>{
      console.log(res);
  });
  }

  supcustId: any;
  saveSupcust(model: Supcust) {
    return this.http.post(this.baseUrl + '/saveSupcust', model, {observe: 'response',
    headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token')})}).pipe(
      map((response: any) => {
        const createdSupcust = response.body;
         this.supcustId = createdSupcust.id;
      })
    );
  }

  updateSupcust(model: Supcust) {
    return this.http.post(this.baseUrl + '/updateSupcust', model, {observe: 'response',
    headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token')})}).pipe(
      map((response: any) => {
        return response.body;
      })
    );
  }

  deleteSupcust(name: NameModel) {
    return this.http.post(this.baseUrl + '/deleteSupcust', name, {observe: 'response',
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
}
