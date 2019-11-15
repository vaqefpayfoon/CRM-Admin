import { Component, OnInit } from '@angular/core';
import { ChargeService } from '../../_services/charge.service';
import { Charge } from '../../_models/charge';
import { PaginatedResult, Pagination } from '../../_models/pagination';
import { Router, ActivatedRoute } from '@angular/router';
import { StringModel } from '../../_models/dropDown';

@Component({
  selector: 'ngx-charge',
  templateUrl: './charge.component.html'
})
export class ChargeComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private chargeService: ChargeService) {
    // let role: string = this.authService.decodedToken.role.toString();
    // let nameid: string = this.authService.decodedToken.nameid.toString();
  }
  userParams: any = {};
  charges: Charge[];
  pagination: Pagination;
  saveState: string = "0";
  ngOnInit() {
    this.chargeService.getAllCharge(1, 10).subscribe((_charges: PaginatedResult<Charge[]>) => {
      this.charges = _charges.result;
      this.pagination = _charges.pagination;
    })
  }
  loadCharges() {
    this.chargeService.getAllCharge(this.pagination.currentPage, this.pagination.itemsPerPage)
      .subscribe((res: PaginatedResult<Charge[]>) => {
        this.charges = res.result;
        this.pagination = res.pagination;
    }, error => { console.log(error);
    });
  }
  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadCharges();
  }
  onAdd() {
    this.router.navigate([-1], { relativeTo: this.route });
  }
  onEdit(charge: Charge) {
    this.router.navigate([charge.id], { relativeTo: this.route });
  }
  onDelete(charge: Charge) {
    let stringModel: StringModel = {id: charge.id, name: ''};
    this.chargeService.deleteCharge(stringModel);
  }
}
