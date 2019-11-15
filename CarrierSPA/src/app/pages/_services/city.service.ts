import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { City } from '../_models/city';
import { map } from 'rxjs/operators';
import { Country } from '../_models/country';
import { AutoComplete, StringModel, NameModel } from '../_models/dropDown';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  baseUrl = environment.apiUrl + 'entity';

  constructor(private http: HttpClient) {}
  cities: City[];
  city: City;
  countries: Country[];
  getCities3() {
    return this.http.get<City[]>(this.baseUrl, { observe: 'response',
    headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token')})}).pipe(map((response: any) => {
      this.cities = response.body;
      return this.cities;
    }));
  }
  getCities2() {
    return this.http.get<City[]>(this.baseUrl, { observe: 'response',
    headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token')})});
  }
  getCitiesName(): Observable<string[]> {
    return this.http.get<City[]>(this.baseUrl + "/getCities", { observe: 'response',
    headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token')})}).pipe(map((response: any) => {
      this.cities = response.body;
      return this.cities.map( x => x.cityName);
    }));
  }
  protected searchData2: AutoComplete[] = [];
  getCitiesAutoComplete(): Observable<AutoComplete[]> {
    return this.http.get<AutoComplete[]>(this.baseUrl + "/getCities", { observe: 'response',
    headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token')})}).pipe(map((response: any) => {
      this.cities = response.body;
      for (let entry of this.cities) {
        let data: AutoComplete = {name: entry.cityName, id: entry.id}
        this.searchData2.push(data);
      }
      return this.searchData2;
    }));
  }
  getCity(key, field) {
    let params = new HttpParams();
    params = params.append('key', key);
    params = params.append('field', field);
    return this.http.get<City>(this.baseUrl + "/getCity", { observe: 'response', params,
    headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token')})}).pipe(map((response: any) => {
      this.city = response.body;
      return this.city;
    }));
  }
  getCountry(key, field) {
    let params = new HttpParams();
    params = params.append('key', key);
    params = params.append('field', field);
    return this.http.get<Country>(this.baseUrl + "/getCountry", { observe: 'response', params,
    headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token')})}).pipe(map((response: any) => {
      this.city = response.body;
      return this.city;
    }));
  }
  getCities(): Observable<City[]> {
    return this.http.get<City[]>(this.baseUrl + "/getCities", { observe: 'response',
    headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token')})}).pipe(map((response: any) => {
      this.cities = response.body;
      return this.cities;
    }));
  }
  filteredCities(name): Observable<City[]> {
    let params = new HttpParams();
    params = params.append('key', name);
    return this.http.get<City[]>(this.baseUrl + "/filteredCities", { observe: 'response', params,
    headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token')})})
      .pipe(map((response: any) => {
      this.cities = response.body;
      return this.cities;
    }));
  }

  getCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(this.baseUrl + "/getCountries", { observe: 'response',
    headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token')})}).pipe(map((response: any) => {
      this.countries = response.body;
      return this.countries;
    }));
  }

  saveCity(model: City) {
    return this.http.post(this.baseUrl + '/saveCity', model, {observe: 'response',
    headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token')})}).pipe(
      map((response: any) => {
        return response.body;
      })
    );
  }

  saveCountry(model: Country) {
    return this.http.post(this.baseUrl + '/saveCountry', model, {observe: 'response',
    headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token')})}).pipe(
      map((response: any) => {
        return response.body;
      })
    );
  }
  updateCity(model: City) {
    return this.http.post(this.baseUrl + '/updateCity', model, {observe: 'response',
    headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token')})}).pipe(
      map((response: any) => {
        return response.body;
      })
    );
  }

  updateCountry(model: Country) {
    return this.http.post(this.baseUrl + '/updateCountry', model, {observe: 'response',
    headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token')})}).pipe(
      map((response: any) => {
        return response.body;
      })
    );
  }
  deleteCity(name: NameModel) {
    return this.http.post(this.baseUrl + '/deleteCity', name, {observe: 'response',
    headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token')})}).pipe(
      map((response: any) => {
        return response.body;
      })
    );
  }

  deleteCountry(name: NameModel) {
    return this.http.post(this.baseUrl + '/deleteCountry', name, {observe: 'response',
    headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('token')})}).pipe(
      map((response: any) => {
        return response.body;
      })
    );
  }
}
