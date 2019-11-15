import { Component, OnInit } from '@angular/core';
import { SupcustGoodService } from '../../_services/supcustGood.service';
import { CompleterService, CompleterData, RemoteData } from 'ng2-completer';
import { ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { AttributeService } from '../../_services/attribute.service';
import { SupcustGood } from '../../_models/SupcustGood';
import { Attribute, ModelsAttribute } from '../../_models/modelsAttribute';
import { StringModel } from '../../_models/dropDown';

@Component({
  selector: 'ngx-supcust-good-form',
  templateUrl: './supcust-good-form.component.html'
})
export class SupcustGoodFormComponent implements OnInit {

  constructor(public supcustGoodService: SupcustGoodService, private completerService: CompleterService, private route: ActivatedRoute, private fb: FormBuilder, private attributeService: AttributeService) { }

  saveState: string = "0";
  protected productName: string;
  protected dataServiceProduct: CompleterData;
  protected supcustName: string;
  protected dataServiceSupcust: CompleterData;
  protected dataService: CompleterData;
  supcustGood: SupcustGood;
  baseForm: FormGroup;
  _id: any;
  supcustGoodId: any;
  orderForm: FormGroup;
  attribute: Attribute;
  attributes: Attribute[] = [];
  ngOnInit() {
    this.route.params.subscribe(
      (param: Params) => {
        this._id = param['id'];
        if(this._id != -1) {
          this.route.data.subscribe(data => {
            this.supcustGood = data['supcustGood'];
            const arrAttribute = data['attributes'];
            this.attributes = arrAttribute.result;
            this.supcustGoodId = this.supcustGood.id;
          });
        }
      }, error => {console.log(error)}, () => {

      }
    )
    this.createBaseForm();
    setTimeout(() => {
      this.dataServiceProduct = this.completerService.remote('http://localhost:5000/api/product/filteredProducts?key=');
      (<RemoteData>this.dataServiceProduct).requestOptions({
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      });
      this.dataServiceSupcust = this.completerService.remote('http://localhost:5000/api/supcust/filteredSupcusts?key=');
      (<RemoteData>this.dataServiceSupcust).requestOptions({
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      });
      this._id != -1 ? this.baseForm.patchValue(this.supcustGood) : this.baseForm.reset();
    }, 900);
  }

  createBaseForm() {
    let attributeControls = new FormArray([]);
    if(this._id == -1) {
      this.baseForm = this.fb.group({
        productName: ['', [Validators.required]],
        supcustName: ['', Validators.required],
        personName: [''],
        serial: [''],
        barcode: [''],
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
        productName: ['', [Validators.required]],
        personName: [''],
        serial: [''],
        barcode: [''],
        supcustName: ['', Validators.required],
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

  onAddIngredient() {

    var items = this.orderForm.value.ingredients;
    let att: ModelsAttribute[] = [];
    items.forEach(item => {
      if(item.attributeName == null && item.attributeValue == null) return;
      att.push({relatedObjectId: this.supcustGoodId, attributeName: item.attributeName,
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
    let stringModel: StringModel = {id: this.supcustGoodId, name: item.attributeName};
    this.attributeService.deleteAttribute(stringModel).subscribe(() => {});
  }
  onUpdateIngredient(index: number) {
    var item = (<FormArray>this.orderForm.get('ingredients')).controls[index].value;
  }
  getControls() {
    return (<FormArray>this.orderForm.get('ingredients')).controls;
  }

  baseSubmit() {
    this.supcustGood = Object.assign({}, this.baseForm.value);
    if(this._id == -1) {
      this.supcustGoodService.saveSupcustGood(this.supcustGood).subscribe(next => {
        this.saveState = '1';
        this.supcustGoodId = this.supcustGoodService.supcustGoodId;
      }, error => {
        this.saveState = error.error;
      }, () => {
      });
    } else {
      this.supcustGoodService.updateSupcustGood(this.supcustGood).subscribe(next => {
        this.saveState = '1';
      }, error => {
        this.saveState = error.error;
      });
    }
  }

}
