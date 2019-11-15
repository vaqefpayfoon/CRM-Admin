import { Component, OnInit } from '@angular/core';
import { CompleterData, CompleterService, RemoteData } from 'ng2-completer';
import { Router, ActivatedRoute } from '@angular/router';
import { SupcustGoodService } from '../../_services/supcustGood.service';
import { SupcustGood } from '../../_models/SupcustGood';
import { StringModel } from '../../_models/dropDown';

@Component({
  selector: 'ngx-supcust-good',
  templateUrl: './supcust-good.component.html'
})
export class SupcustGoodComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private completerService: CompleterService, private supcustGoodService: SupcustGoodService) { }
  formStatus: string = 'nothing';
  protected productName: string;
  protected dataServiceProduct: CompleterData;
  protected supcustName: string;
  protected dataServiceSupcust: CompleterData;
  supcustGood: SupcustGood;
  supcustGoods: SupcustGood[];
  saveState: string = "0";
  ngOnInit() {
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
    }, 800);
  }
  onAdd() {
    this.router.navigate([-1], { relativeTo: this.route });
  }
  onEdit() {
    this.supcustGoodService.getSupcustGood(this.supcustName, this.productName).subscribe((_supcustGood: SupcustGood[]) => {
      this.supcustGoods = _supcustGood;
      this.saveState = '1';
    }, error => {
      this.saveState = error.error;
    }, () => {
      //this.router.navigate([this.supcustGood.id], { relativeTo: this.route });
    })
  }
  onDelete() {
    let name: StringModel = {id: '', name: this.productName};
    this.supcustGoodService.deleteSupcustGood(name).subscribe(() => {
      this.saveState = '1';
    }, error => {
      this.saveState = error.error;
    }, () => {
    })
  }

}
