import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { PaginatedResult } from '../_models/pagination';
import { environment } from '../../../environments/environment';
import { StringModel, NameModel } from '../_models/dropDown';
import { FileStore } from '../_models/fileStore';
import { Product } from '../_models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = environment.apiUrl + 'product';
  uploadUrl = environment.apiUrl + 'storefile';

  constructor(private http: HttpClient) {}
  product: Product;
  products: Product[];
  fileStore: FileStore;
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl + "/getProducts", { observe: 'response'})
    .pipe(map((response: any) => { this.products = response.body;
      return this.products;
    }));
  }

  getAllProducts(page?, itemsPerPage?, userParams?): Observable<PaginatedResult<Product[]>> {
    const paginatedResult: PaginatedResult<Product[]> = new PaginatedResult<Product[]>();

    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }
    if (userParams != null) {
      params = params.append('orderBy', userParams.orderBy);
    }
    return this.http.get<Product[]>(this.baseUrl + "/getProducts", { observe: 'response', params})
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

  getProduct(key, field) {
    let params = new HttpParams();
    params = params.append('key', key);
    params = params.append('field', field);
    return this.http.get<Product>(this.baseUrl + "/getProduct", { observe: 'response', params,
    headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token')})}).pipe(
      map((response: any) => {
      this.product = response.body.productDto;
      return this.product;
    }));
  }

  test(model: Product) {
    let stringModel: StringModel = {id: '', name: 'model'};
    return this.http.post(this.baseUrl + '/default', stringModel, {observe: 'response',
    headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token')})}).pipe(
      map((response: any) => {
        return response.body;
      })
    );
  }
  productId: any;
  saveProduct(model: Product) {
    return this.http.post(this.baseUrl + '/saveProduct', model, {observe: 'response',
    headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token')})}).pipe(
      map((response: any) => {
        const createdProduct = response.body;
         this.productId = createdProduct.id;
      })
    );
  }

  updateProduct(model: Product) {
    return this.http.post(this.baseUrl + '/updateProduct', model, {observe: 'response',
    headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token')})}).pipe(
      map((response: any) => {
        return response.body;
      })
    );
  }

  deleteProduct(name: NameModel) {
    return this.http.post(this.baseUrl + '/deleteProduct', name, {observe: 'response',
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
