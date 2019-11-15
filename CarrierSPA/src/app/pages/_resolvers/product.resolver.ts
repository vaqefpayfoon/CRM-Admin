import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from '../_models/product';
import { ProductService } from '../_services/product.service';


@Injectable({ providedIn: 'root' })

export class ProductResolver implements Resolve<Product> {

  constructor(private productService: ProductService, private router: Router) {}
  resolve(route: ActivatedRouteSnapshot): Observable<Product> | Promise<Product> | Product {
    if(route.params['id'] != -1)
      return this.productService.getProduct(route.params['id'], 'id');
    return null;
  }
}
