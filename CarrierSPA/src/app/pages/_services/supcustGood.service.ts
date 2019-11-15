import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { PaginatedResult } from '../_models/pagination';
import { environment } from '../../../environments/environment';
import { StringModel } from '../_models/dropDown';
import { FileStore } from '../_models/fileStore';
import { SupcustGood } from '../_models/SupcustGood';


@Injectable({
  providedIn: 'root'
})
export class SupcustGoodService {

  baseUrl = environment.apiUrl + 'supcustGood';
  uploadUrl = environment.apiUrl + 'storefile';

  constructor(private http: HttpClient) {}
  supcustGood: SupcustGood;
  supcustGoods: SupcustGood[];
  fileStore: FileStore;
  getSupcustGoods(): Observable<SupcustGood[]> {
    return this.http.get<SupcustGood[]>(this.baseUrl + "/getSupcustGood", { observe: 'response'})
    .pipe(map((response: any) => { this.supcustGoods = response.body;
      return this.supcustGoods;
    }));
  }

  getAllSupcustGoods(page?, itemsPerPage?, userParams?): Observable<PaginatedResult<SupcustGood[]>> {
    const paginatedResult: PaginatedResult<SupcustGood[]> = new PaginatedResult<SupcustGood[]>();

    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }
    if (userParams != null) {
      params = params.append('orderBy', userParams.orderBy);
    }
    return this.http.get<SupcustGood[]>(this.baseUrl + "/getAllSupcustGood", { observe: 'response', params})
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

  getSupcustGood(supcustId, productId) {
    let params = new HttpParams();
    params = params.append('supcustId', supcustId);
    params = params.append('productId', productId);
    return this.http.get<SupcustGood[]>(this.baseUrl + "/getSupcustGood", { observe: 'response', params,
    headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token')})}).pipe(
      map((response: any) => {
      this.supcustGoods = response.body;
      return this.supcustGoods;
    }));
  }
  getSupcustGoodId(id) {
    let params = new HttpParams();
    params = params.append('id', id);
    return this.http.get<SupcustGood>(this.baseUrl + "/getSupcustGoodId", { observe: 'response', params,
    headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token')})}).pipe(
      map((response: any) => {
      this.supcustGood = response.body;
      return this.supcustGood;
    }));
  }
  supcustGoodId: any;
  saveSupcustGood(model: SupcustGood) {
    return this.http.post(this.baseUrl + '/saveSupcustGood', model, {observe: 'response',
    headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token')})}).pipe(
      map((response: any) => {
        const createdsupcustGood = response.body;
         this.supcustGoodId = createdsupcustGood.id;
      })
    );
  }

  updateSupcustGood(model: SupcustGood) {
    return this.http.post(this.baseUrl + '/updateSupcustGood', model, {observe: 'response',
    headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token')})}).pipe(
      map((response: any) => {
        return response.body;
      })
    );
  }

  deleteSupcustGood(name: StringModel) {
    return this.http.post(this.baseUrl + '/deleteSupcustGood', name, {observe: 'response',
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

  products: SupcustGood[];
  getProducts: Subject<SupcustGood[]>;
  getSupcustsProducts(supcust): Observable<SupcustGood[]> {
    let params = new HttpParams();
    params = params.append('supcust', supcust);
    return this.http.get<SupcustGood[]>(this.baseUrl + "/filteredProducts", { observe: 'response', params,
    headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token')})}).pipe(
      map((response: any) => {
      this.products = response.body;
      this.getProducts.next(this.products);
      return this.products;
    }));
  }
}
