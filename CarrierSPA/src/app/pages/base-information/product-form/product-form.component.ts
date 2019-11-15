import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../_services/product.service';
import { ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '../../_models/product';

@Component({
  selector: 'ngx-product-form',
  templateUrl: './product-form.component.html'
})
export class ProductFormComponent implements OnInit {

  constructor(public productService: ProductService, private route: ActivatedRoute, private fb: FormBuilder) { }

  saveState: string = "0";
  product: Product;
  baseForm: FormGroup;
  _id: any;
  productId: any;
  orderForm: FormGroup;
  ngOnInit() {
    this.route.params.subscribe(
      (param: Params) => {
        this._id = param['id'];
        if(this._id != -1) {
          this.route.data.subscribe(data => {
            this.product = data['product'];
            this.productId = this.product.id;
          });
        }
      }, error => {console.log(error)}, () => {

      }
    )
    this.createBaseForm();
    setTimeout(() => {
      this._id != -1 ? this.baseForm.patchValue(this.product) : this.baseForm.reset();
    }, 900);
  }

  createBaseForm() {
    if(this._id == -1) {
      this.baseForm = this.fb.group({
        productName: ['', [Validators.required]]
      });
    } else {
      this.baseForm = this.fb.group({
        id: ['', []],
        productName: ['', [Validators.required]]
      });
    }
  }

  baseSubmit() {
    this.product = Object.assign({}, this.baseForm.value);
    if(this._id == -1) {
      this.productService.saveProduct(this.product).subscribe(next => {
        this.saveState = '1';
        this.productId = this.productService.productId;
      }, error => {
        this.saveState = error.error;
      }, () => {
      });
    } else {
      this.productService.updateProduct(this.product).subscribe(next => {
        this.saveState = '1';
      }, error => {
        this.saveState = error.error;
      });
    }
  }

}
