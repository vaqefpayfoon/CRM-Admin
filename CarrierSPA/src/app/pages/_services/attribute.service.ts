import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { StringModel } from '../_models/dropDown';
import { ModelsAttribute, Attribute } from '../_models/modelsAttribute';
import { NumerableResult } from '../_models/pagination';

const httpOptions = {
  observe: 'response',
  headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token')})
};
@Injectable({
  providedIn: 'root'
})

export class AttributeService {

  baseUrl = environment.apiUrl + 'attribute';

  constructor(private http: HttpClient) {}
  attribute: ModelsAttribute;
  attributes: ModelsAttribute[];
  atts: Attribute[];
  modelsAtt = new Array<Attribute>();
  getAttributes(id: any): Observable<NumerableResult<ModelsAttribute[]>> {
    const numerableResult: NumerableResult<ModelsAttribute[]> = new NumerableResult<ModelsAttribute[]>();
    let params = new HttpParams();
    params = params.append('id', id);
    return this.http.get<ModelsAttribute[]>(this.baseUrl + "/getAttributes", { observe: 'response', params,
    headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token')})})
    .pipe(map((response: any) => {
      numerableResult.result = response.body;
      return numerableResult;
    }));
  }
  getAllAttributes(id: any) {

    let params = new HttpParams();
    params = params.append('id', id);
    return this.http.get<Array<Attribute>>(this.baseUrl + "/getAttributes", { observe: 'response', params,
    headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token')})})
    .pipe(map((response: any) => {
      this.modelsAtt = response.body;
      return this.modelsAtt;
    }));
  }
  default() {
    let stringModel;
    return this.http.get<StringModel>('http://localhost:5000/api/attribute/default', {observe: 'response',
    headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token')})})
    .subscribe((response: any) => {
      console.log(response.body);
       stringModel = response.body
       return stringModel;
      });
  }

  modelsAttributeId: any;
  saveAttribute(model: ModelsAttribute[]) {
    return this.http.post(this.baseUrl + '/saveAttribute', model, {observe: 'response',
    headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token')})}).pipe(
      map((response: any) => {
         const model = response.body;
         console.log(model);
         this.modelsAttributeId = model.id;
      })
    );
  }

  updateAttribute(model: ModelsAttribute) {
    return this.http.post(this.baseUrl + '/updateAttribute', model, {observe: 'response',
    headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token')})}).pipe(
      map((response: any) => {
        return response.body;
      })
    );
  }

  deleteAttribute(model: StringModel) {
    return this.http.post(this.baseUrl + '/deleteAttribute', model, {observe: 'response',
    headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token')})}).pipe(
      map((response: any) => {
        return response.body;
      })
    );
  }
}
