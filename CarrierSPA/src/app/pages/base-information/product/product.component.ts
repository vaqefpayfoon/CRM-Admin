import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CompleterService, CompleterData, RemoteData } from 'ng2-completer';
import { ProductService } from '../../_services/product.service';
import { Product } from '../../_models/product';
import { NameModel } from '../../_models/dropDown';

@Component({
  selector: 'ngx-product',
  templateUrl: './product.component.html'
})
export class ProductComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private completerService: CompleterService, private productService: ProductService) { }
  formStatus: string = 'nothing';
  protected productName: string;
  protected dataService: CompleterData;
  product: Product;
  saveState: string = "0";
  ngOnInit() {
    setTimeout(() => {
      this.dataService = this.completerService.remote('http://localhost:5000/api/product/filteredProducts?key=');
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
    this.productService.getProduct(this.productName, 'name').subscribe((_product: Product) => {
      this.product = _product;
      this.saveState = '1';
    }, error => {
      this.saveState = error.error;
    }, () => {
      this.router.navigate([this.product.id], { relativeTo: this.route });
    })
  }
  onDelete() {
    let name: NameModel = {name: this.productName};
    this.productService.deleteProduct(name).subscribe(() => {
      this.saveState = '1';
    }, error => {
      this.saveState = error.error;
    }, () => {
    })
  }

}
