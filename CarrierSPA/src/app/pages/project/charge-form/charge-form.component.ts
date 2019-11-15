import { Component, OnInit } from '@angular/core';
import { ChargeService } from '../../_services/charge.service';
import { ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { Charge, ChargeDetail } from '../../_models/charge';
import { AuthService } from '../../_services/auth.service';
import { DropDown, StringModel } from '../../_models/dropDown';
import { CompleterData, RemoteData, CompleterService } from 'ng2-completer';

@Component({
  selector: 'ngx-charge-form',
  templateUrl: './charge-form.component.html'
})
export class ChargeFormComponent implements OnInit {

  constructor(public chargeService: ChargeService, private route: ActivatedRoute, private fb: FormBuilder, private authService: AuthService, private completerService: CompleterService) { }
  protected dataService: CompleterData;
  chargeTypeArr : DropDown[] = [{id: '0', name:'Ticket'}, {id: '1', name: 'Hotel'}, {id: '2', name:'Taxi'},
   {id: '3', name: 'Food'}, {id: '4', name: 'Other'}];
  saveState: string = "0";
  charge: Charge;
  chargeDetail: ChargeDetail;
  _id:any;
  baseForm: FormGroup;
  orderForm: FormGroup;

  ngOnInit() {
    this.route.params.subscribe(
      (param: Params) => {
        this._id = param['id'];
        if(this._id != -1) {
          this.route.data.subscribe(data => {
            this.charge = data['charge'];
            this._id = this.charge.id;
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
      this._id != -1 ? this.baseForm.patchValue(this.charge) : this.baseForm.reset();
    }, 900);
  }

  createBaseForm() {
    let attributeControls = new FormArray([]);
    if(this._id == -1) {
      this.baseForm = this.fb.group({
        userId: [this.authService.decodedToken.nameid],
        cityName: ['', Validators.required],
        createAt: ['', [Validators.required]],
      });
      attributeControls.push(
        new FormGroup({
          'id': new FormControl('00000000-0000-0000-0000-000000000000'),
          'chargeId': new FormControl(this._id),
          'chargeType': new FormControl(null, Validators.required),
          'amount': new FormControl(0, Validators.required),
          'moreInfo': new FormControl(null, Validators.required),
        })
      );
    } else {
      this.baseForm = this.fb.group({
        id: ['', []],
        userId: [this.authService.decodedToken.nameid],
        cityName: ['', Validators.required],
        createAt: ['', [Validators.required]],
      });
      for(let chargeDetail of this.charge.chargeDetails) {
        attributeControls.push(
          new FormGroup({
            'id': new FormControl(chargeDetail.id),
            'chargeId': new FormControl(chargeDetail.chargeId),
            'chargeType': new FormControl(chargeDetail.chargeType, Validators.required),
            'amount': new FormControl(chargeDetail.amount, Validators.required),
            'moreInfo': new FormControl(chargeDetail.moreInfo, Validators.required),
          })
        );
       }
    }
    this.orderForm = new FormGroup({
      'ingredients': attributeControls
    });

  }

  baseSubmit() {
    this.charge = Object.assign({}, this.baseForm.value);
    if(this._id == -1) {
      this.chargeService.saveCharge(this.charge).subscribe(next => {
        this.saveState = '1';
        this._id = this.chargeService.chargeId;
      }, error => {
        this.saveState = error.error;
      }, () => {
      });
    } else {
      this.chargeService.updateCharge(this.charge).subscribe(next => {
        this.saveState = '1';
      }, error => {
        this.saveState = error.error;
      });
    }
  }
  onAddIngredient(index: number) {

    var items = this.orderForm.value.ingredients;
    var item = (<FormArray>this.orderForm.get('ingredients')).controls[index].value;
    //let att: ChargeDetail = {id: '00000000-0000-0000-0000-000000000000',chargeId: this._id, chargeType: item.chargeType, amount: item.amount, moreInfo: item.moreInfo, createdAt: new Date()}

    this.chargeService.saveChargeDetail(item).subscribe(() => {});
    (<FormArray>this.orderForm.get('ingredients')).push(
      new FormGroup({
          'id': new FormControl('00000000-0000-0000-0000-000000000000'),
          'chargeId': new FormControl(this._id),
          'chargeType': new FormControl(null, Validators.required),
          'amount': new FormControl(0, Validators.required),
          'moreInfo': new FormControl(null, Validators.required),
      })
    );
  }
  onDeleteIngredient(index: number) {
    var item = (<FormArray>this.orderForm.get('ingredients')).controls[index].value;
    (<FormArray>this.orderForm.get('ingredients')).removeAt(index);
    if(item.attributeName == null && item.attributeValue == null)
    return;
    let stringModel: StringModel = {id: this._id, name: item.attributeName};
    this.chargeService.deleteChargeDetail(stringModel).subscribe(() => {});
  }
  onUpdateIngredient(index: number) {
    var item = (<FormArray>this.orderForm.get('ingredients')).controls[index].value;
    this.chargeService.updateChargeDetail(item).subscribe(() => {});
  }
  getControls() {
    return (<FormArray>this.orderForm.get('ingredients')).controls;
  }

}
