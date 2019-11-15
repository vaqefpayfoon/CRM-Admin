import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CompleterService, CompleterData, RemoteData } from 'ng2-completer';
import { CityService } from '../../_services/city.service';
import { City } from '../../_models/city';
import { NameModel } from '../../_models/dropDown';


@Component({
  selector: 'ngx-city',
  templateUrl: './city.component.html'
})
export class CityComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private completerService: CompleterService,
    private cityService: CityService) { }
  formStatus: string = 'nothing';
  protected cityName: string;
  protected dataService: CompleterData;
  city: City;
  saveState: string = "0";
  ngOnInit() {
    setTimeout(() => {
      this.dataService = this.completerService.remote('http://localhost:5000/api/entity/filteredCities?key=');
      (<RemoteData>this.dataService).requestOptions({
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      });
    }, 800);
  }
  onAdd() {
    this.router.navigate([-1], { relativeTo: this.route });
  }
  onEdit() {
    this.cityService.getCity(this.cityName, 'name').subscribe((_city: City) => {
      this.city = _city;
    }, error => {
      console.log(error);
    }, () => {
      this.router.navigate([this.city.id], { relativeTo: this.route });
    })
  }
  onDelete() {
    let name: NameModel = {name: this.cityName};
    this.cityService.deleteCity(name).subscribe(() => {
      this.saveState = '1';
    }, error => {
      this.saveState = error.error;
    }, () => {

    })
  }
}
