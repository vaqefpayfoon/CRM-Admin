import { Component, OnInit } from '@angular/core';
import { CompleterData, CompleterService, CompleterItem } from 'ng2-completer';
import { CityService } from '../../_services/city.service';
import { ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { City } from '../../_models/city';

@Component({
  selector: 'ngx-cityForm',
  templateUrl: './cityForm.component.html'
})
export class CityFormComponent implements OnInit {

  constructor(public cityService: CityService, private completerService: CompleterService, private route: ActivatedRoute, private fb: FormBuilder) { }
  saveState: string = "0";
  protected dataService: CompleterData;
  city: City;
  baseForm: FormGroup;
  _id: any;
  ngOnInit() {
    this.route.params.subscribe(
      (param: Params) => {
        this._id = param['id'];
        if(this._id != -1) {
          this.route.data.subscribe(data => {
            this.city = data['city'];
          });
        }
      }, error => {console.log(error)}, () => {

      }
    )

    this.createBaseForm();
    setTimeout(() => {
      this.dataService = this.completerService.remote('http://localhost:5000/api/entity/filteredCountries?key=');
      this._id != -1 ? this.baseForm.patchValue(this.city) : this.baseForm.reset();
    }, 900);
  }

  createBaseForm() {
    if(this._id == -1) {
      this.baseForm = this.fb.group({
        cityName: ['', [Validators.required]],
        countryName: ['', [Validators.required]],
      });
    } else {
      this.baseForm = this.fb.group({
        id: ['', []],
        cityName: ['', [Validators.required]],
        countryName: ['', [Validators.required]],
      });
    }
  }

  baseSubmit() {
    this.city = Object.assign({}, this.baseForm.value);
    if(this._id == -1) {
      this.cityService.saveCity(this.city).subscribe(next => {
        this.saveState = '1';
      }, error => {
        this.saveState = error.error;
      });
    } else {
      this.cityService.updateCity(this.city).subscribe(next => {
        this.saveState = '1';
      }, error => {
        this.saveState = error.error;
      });
    }

  }

  onItemSelect(selected:CompleterItem) {
    // if(selected)
    //     this.model.countryName = selected.originalObject.value;
  }

}
