import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CompleterService, CompleterData, RemoteData } from 'ng2-completer';
import { CityService } from '../../_services/city.service';
import { Country } from '../../_models/country';
import { NameModel } from '../../_models/dropDown';

@Component({
  selector: 'ngx-country',
  templateUrl: './country.component.html'
})
export class CountryComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private completerService: CompleterService,
    private cityService: CityService) { }
  formStatus: string = 'nothing';
  protected countryName: string;
  protected dataService: CompleterData;
  country: Country;
  saveState: string = "0";
  ngOnInit() {
    setTimeout(() => {
      this.dataService = this.completerService.remote('http://localhost:5000/api/entity/filteredCountries?key=');
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
    this.cityService.getCountry(this.countryName, 'name').subscribe((_country: Country) => {
      this.country = _country;
      this.saveState = '1';
    }, error => {
      this.saveState = error.error;
    }, () => {
      this.router.navigate([this.country.id], { relativeTo: this.route });
    })
  }
  onDelete() {
    let name: NameModel = {name: this.countryName};
    this.cityService.deleteCountry(name).subscribe(() => {
      this.saveState = '1';
    }, error => {
      this.saveState = error.error;
    }, () => {
    })
  }
}
