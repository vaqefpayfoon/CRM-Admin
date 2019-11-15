import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CompleterService, CompleterData, RemoteData } from 'ng2-completer';
import { SupcustService } from '../../_services/supcust.service';
import { Supcust } from '../../_models/supcust';
import { NameModel } from '../../_models/dropDown';

@Component({
  selector: 'ngx-supcust',
  templateUrl: './supcust.component.html'
})
export class SupcustComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private completerService: CompleterService, private supcustService: SupcustService) { }
  formStatus: string = 'nothing';
  protected supcustName: string;
  protected dataService: CompleterData;
  supcust: Supcust;
  saveState: string = "0";
  ngOnInit() {
    setTimeout(() => {
      this.dataService = this.completerService.remote('http://localhost:5000/api/supcust/filteredSupcusts?key=');
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
    this.supcustService.getSupcust(this.supcustName, 'name').subscribe((_supcust: Supcust) => {
      this.supcust = _supcust;
      this.saveState = '1';
    }, error => {
      this.saveState = error.error;
    }, () => {
      this.router.navigate([this.supcust.id], { relativeTo: this.route });
    })
  }
  onDelete() {
    let name: NameModel = {name: this.supcustName};
    this.supcustService.deleteSupcust(name).subscribe(() => {
      this.saveState = '1';
    }, error => {
      this.saveState = error.error;
    }, () => {
    })
  }

}
