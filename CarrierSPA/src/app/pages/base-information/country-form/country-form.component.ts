import { Component, OnInit } from '@angular/core';
import { CityService } from '../../_services/city.service';
import { CompleterService, CompleterData } from 'ng2-completer';
import { ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Country } from '../../_models/country';

@Component({
  selector: 'ngx-country-form',
  templateUrl: './country-form.component.html'
})
export class CountryFormComponent implements OnInit {

  constructor(public cityService: CityService, private completerService: CompleterService, private route: ActivatedRoute, private fb: FormBuilder) { }
  saveState: string = "0";
  protected dataService: CompleterData;
  country: Country;
  baseForm: FormGroup;
  _id: any;
  ngOnInit() {
    this.route.params.subscribe(
      (param: Params) => {
        this._id = param['id'];
        if(this._id != -1) {
          this.route.data.subscribe(data => {
            this.country = data['country'];
          });
        }
      }, error => {console.log(error)}, () => {

      }
    )
    this.createBaseForm();
    setTimeout(() => {
      this.dataService = this.completerService.remote('http://localhost:5000/api/entity/filteredCountries?key=');
      this._id != -1 ? this.baseForm.patchValue(this.country) : this.baseForm.reset();
    }, 900);
  }

  createBaseForm() {
    if(this._id == -1) {
      this.baseForm = this.fb.group({
        countryName: ['', [Validators.required]],
      });
    } else {
      this.baseForm = this.fb.group({
        id: ['', []],
        countryName: ['', [Validators.required]],
      });
    }

  }

  baseSubmit() {
    this.country = Object.assign({}, this.baseForm.value);
    if(this._id == -1) {
      this.cityService.saveCountry(this.country).subscribe(next => {
        this.saveState = '1';
      }, error => {
        this.saveState = error.error;
      });
    } else {
      this.cityService.updateCountry(this.country).subscribe(next => {
        this.saveState = '1';
      }, error => {
        this.saveState = error.error;
      });
    }


  }


}
