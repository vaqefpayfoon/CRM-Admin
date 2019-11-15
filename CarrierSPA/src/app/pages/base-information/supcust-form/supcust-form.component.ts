import { Component, OnInit } from '@angular/core';
import { SupcustService } from '../../_services/supcust.service';
import { CompleterService, CompleterData, RemoteData } from 'ng2-completer';
import { ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { Supcust } from '../../_models/supcust';
import { Attribute, ModelsAttribute } from '../../_models/modelsAttribute';
import { AttributeService } from '../../_services/attribute.service';
import { StringModel } from '../../_models/dropDown';

@Component({
  selector: 'ngx-supcust-form',
  templateUrl: './supcust-form.component.html'
})
export class SupcustFormComponent implements OnInit {

  constructor(public supcustService: SupcustService, private completerService: CompleterService, private route: ActivatedRoute, private fb: FormBuilder, private attributeService: AttributeService) { }

  saveState: string = "0";
  protected dataService: CompleterData;
  supcust: Supcust;
  baseForm: FormGroup;
  _id: any;
  supcustId: any;
  orderForm: FormGroup;
  attribute: Attribute;
  attributes: Attribute[] = [];
  ngOnInit() {
    this.route.params.subscribe(
      (param: Params) => {
        this._id = param['id'];
        if(this._id != -1) {
          this.route.data.subscribe(data => {
            this.supcust = data['supcust'];
            this.supcustId = this.supcust.id;
            const arrAttribute = data['attributes'];
            this.attributes = arrAttribute.result;
          });
        }
      }, error => {console.log(error)}, () => {

      }
    )
    this.createBaseForm();
    setTimeout(() => {
      this.dataService = this.completerService.remote('http://localhost:5000/api/entity/filteredCities?key=');
      (<RemoteData>this.dataService).requestOptions({
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      });
      this._id != -1 ? this.baseForm.patchValue(this.supcust) : this.baseForm.reset();
    }, 900);
  }

  createBaseForm() {
    let attributeControls = new FormArray([]);
    if(this._id == -1) {
      this.baseForm = this.fb.group({
        supcustName: ['', [Validators.required]],
        cityName: ['', Validators.required],
        email: ['', [Validators.email]],
        phone: [''],
        address: [''],
        moreInfo: [''],
      });
      attributeControls.push(
        new FormGroup({
          'attributeName': new FormControl(null, Validators.required),
          'attributeValue': new FormControl(null, Validators.required)
        })
      );
    } else {
      this.baseForm = this.fb.group({
        id: ['', []],
        supcustName: ['', [Validators.required]],
        cityName: ['', Validators.required],
        email: ['', [Validators.email]],
        phone: [''],
        address: [''],
        moreInfo: [''],
      });
      for(let attribute of this.attributes) {
        attributeControls.push(
          new FormGroup({
            'attributeName': new FormControl(attribute.attributeName, Validators.required),
            'attributeValue': new FormControl(attribute.attributeValue, Validators.required)
          })
        );
       }
    }
    this.orderForm = new FormGroup({
      'ingredients': attributeControls
    });

  }

  baseSubmit() {
    this.supcust = Object.assign({}, this.baseForm.value);
    if(this._id == -1) {
      this.supcustService.saveSupcust(this.supcust).subscribe(next => {
        this.saveState = '1';
        this.supcustId = this.supcustService.supcustId;
      }, error => {
        this.saveState = error.error;
      }, () => {
      });
    } else {
      this.supcustService.updateSupcust(this.supcust).subscribe(next => {
        this.saveState = '1';
      }, error => {
        this.saveState = error.error;
      });
    }
  }
  onAddIngredient() {

    var items = this.orderForm.value.ingredients;
    let att: ModelsAttribute[] = [];
    items.forEach(item => {
      if(item.attributeName == null && item.attributeValue == null) return;
      att.push({relatedObjectId: this.supcustId, attributeName: item.attributeName,
        attributeValue: item.attributeValue})
    });
    this.attributeService.saveAttribute(att).subscribe(() => {});
    (<FormArray>this.orderForm.get('ingredients')).push(
      new FormGroup({
        'attributeName': new FormControl(null, Validators.required),
        'attributeValue': new FormControl(null, Validators.required)
      })
    );
  }
  onDeleteIngredient(index: number) {
    var item = (<FormArray>this.orderForm.get('ingredients')).controls[index].value;
    (<FormArray>this.orderForm.get('ingredients')).removeAt(index);
    if(item.attributeName == null && item.attributeValue == null)
    return;
    let stringModel: StringModel = {id: this.supcustId, name: item.attributeName};
    this.attributeService.deleteAttribute(stringModel).subscribe(() => {});
  }
  onUpdateIngredient(index: number) {
    var item = (<FormArray>this.orderForm.get('ingredients')).controls[index].value;
  }
  getControls() {
    return (<FormArray>this.orderForm.get('ingredients')).controls;
  }
}
