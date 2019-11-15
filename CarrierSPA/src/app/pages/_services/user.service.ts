import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { PaginatedResult } from '../_models/pagination';
import { User, UserDto } from '../_models/user';
import { environment } from '../../../environments/environment';
import { StringModel, NameModel } from '../_models/dropDown';
import { FileStore } from '../_models/fileStore';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = environment.apiUrl + 'user';
  uploadUrl = environment.apiUrl + 'storefile';

  constructor(private http: HttpClient) {}
  users: User[];
  user: User;
  userDto: UserDto;
  fileStore: FileStore;
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl + "/getUsers", { observe: 'response',
    headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token')})})
    .pipe(map((response: any) => { this.users = response.body;
      return this.users;
    }));
  }

  getAllUsers(page?, itemsPerPage?, userParams?): Observable<PaginatedResult<User[]>> {
    const paginatedResult: PaginatedResult<User[]> = new PaginatedResult<User[]>();

    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }
    if (userParams != null) {
      params = params.append('orderBy', userParams.orderBy);
    }
    return this.http.get<User[]>(this.baseUrl + "/getAllUsers", { observe: 'response', params,
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

  getUser(key, field) {
    let params = new HttpParams();
    params = params.append('key', key);
    params = params.append('field', field);
    return this.http.get<User>(this.baseUrl + "/getUser", { observe: 'response', params,
    headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token')})}).pipe(map((response: any) => {
      const createdUser = response.body;
      this.user = createdUser.userDto;
      return this.user;
    }));
  }

  test(model: User) {
    let stringModel: StringModel = {id: '', name: 'model'};
    return this.http.post(this.baseUrl + '/default', stringModel, {observe: 'response',
    headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token')})}).pipe(
      map((response: any) => {
        return response.body;
      })
    );
  }
  userId: any;
  saveUser(model: User) {
    return this.http.post(this.baseUrl + '/saveUser', model, {observe: 'response',
    headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token')})}).pipe(
      map((response: any) => {
        const createdUser = response.body;
         this.userId = createdUser.id;
      })
    );
  }
  savePhoto(file: File, userId: any) {
    const fileToUpload =  file;
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    formData.append('extension', fileToUpload.type);
    formData.append('userId', userId);
    formData.append('fileName', fileToUpload.name);
    formData.append('tableName', 'users');

    return this.http.post(this.uploadUrl + '/savePhoto', formData, {reportProgress: true, observe: 'response',
    headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token')})}).pipe(
      map((response: any) => {
        return response.body;
      })
    );
  }

  updateUser(model: User) {
    return this.http.post(this.baseUrl + '/updateUser', model, {observe: 'response',
    headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token')})}).pipe(
      map((response: any) => {
        return response.body;
      })
    );
  }

  deleteUser(name: NameModel) {
    return this.http.post(this.baseUrl + '/deleteUser', name, {observe: 'response',
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
