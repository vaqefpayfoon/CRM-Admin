import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { PaginatedResult } from '../_models/pagination';
import { environment } from '../../../environments/environment';
import { StringModel } from '../_models/dropDown';
import { Charge, ChargeDetail } from '../_models/charge';

const httpOptions = {
  observe: 'response',
  headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token')})
};
@Injectable({
  providedIn: 'root'
})
export class ChargeService {

  baseUrl = environment.apiUrl + 'charge';
  baseUrl2 = environment.apiUrl + 'chargeDetail';

  constructor(private http: HttpClient) {}
  charge: Charge;
  charges: Charge[];
  chargeDetail: ChargeDetail[];

  getCharges(): Observable<Charge[]> {
    return this.http.get<Charge[]>(this.baseUrl + "/getCharges", { observe: 'response',
    headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token')})})
    .pipe(map((response: any) => { this.charges = response.body;
      return this.charges;
    }));
  }

  getAllCharge(page?, itemsPerPage?, userParams?): Observable<PaginatedResult<Charge[]>> {
    const paginatedResult: PaginatedResult<Charge[]> = new PaginatedResult<Charge[]>();

    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }
    if (userParams != null) {
      params = params.append('orderBy', userParams.orderBy);
    }
    return this.http.get<Charge[]>(this.baseUrl + "/getCharges", { observe: 'response', params,
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

  getCharge(id) {
    let params = new HttpParams();
    params = params.append('id', id);
    return this.http.get<Charge>(this.baseUrl + "/getCharge", { observe: 'response', params,
    headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token')})}).pipe(
      map((response: any) => {
      this.charge = response.body;
      return this.charge;
    }));
  }

  chargeId: any;
  saveCharge(model: Charge) {
    return this.http.post(this.baseUrl + '/saveCharge', model, {observe: 'response',
    headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token')})}).pipe(
      map((response: any) => {
        const model = response.body;
         this.chargeId = model.id;
      })
    );
  }

  updateCharge(model: Charge) {
    return this.http.post(this.baseUrl + '/updateCharge', model, {observe: 'response',
    headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token')})}).pipe(
      map((response: any) => {
        return response.body;
      })
    );
  }

  deleteCharge(name: StringModel) {
    return this.http.post(this.baseUrl + '/deleteCharge', name, {observe: 'response',
    headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token')})}).pipe(
      map((response: any) => {
        return response.body;
      })
    );
  }

  //detail

  getChargeDetail(id) {
    let params = new HttpParams();
    params = params.append('id', id);
    return this.http.get<ChargeDetail>(this.baseUrl + "/getChargeDetail", { observe: 'response', params,
    headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token')})}).pipe(
      map((response: any) => {
      this.chargeDetail = response.body;
      return this.chargeDetail;
    }));
  }

  chargeDetailId: any;
  saveChargeDetail(model: ChargeDetail) {
    return this.http.post(this.baseUrl + '/saveChargeDetail', model, {observe: 'response',
    headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token')})}).pipe(
      map((response: any) => {
        const model = response.body;
         this.chargeDetailId = model.id;
      })
    );
  }

  updateChargeDetail(model: ChargeDetail) {
    return this.http.post(this.baseUrl + '/updateCharge', model, {observe: 'response',
    headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token')})}).pipe(
      map((response: any) => {
        return response.body;
      })
    );
  }

  deleteChargeDetail(name: StringModel) {
    return this.http.post(this.baseUrl + '/deleteCharge', name, {observe: 'response',
    headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token')})}).pipe(
      map((response: any) => {
        return response.body;
      })
    );
  }
}
