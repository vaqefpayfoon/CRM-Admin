import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CompleterService, CompleterData, RemoteData } from 'ng2-completer';
import { ProjectHeader } from '../../_models/project-header';
import { ProjectService } from '../../_services/project.service';

@Component({
  selector: 'ngx-project-detail',
  templateUrl: './project-detail.component.html'
})
export class ProjectDetailComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private completerService: CompleterService, private projectTypeService: ProjectService) { }
  formStatus: string = 'nothing';
  protected projectTitle: string;
  protected supcustName: string;
  protected productName: string;
  protected userName: string;
  protected dataServiceProject: CompleterData;
  protected dataServiceSupcust: CompleterData;
  protected dataServiceProduct: CompleterData;
  protected dataServiceUsers: CompleterData;

  header: ProjectHeader;
  headerId: any;
  saveState: string = "0";
  ngOnInit() {
    setTimeout(() => {
      this.dataServiceProject = this.completerService.remote('http://localhost:5000/api/projectType/filteredProjectType?key=');
      (<RemoteData>this.dataServiceProject).requestOptions({
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      });
      this.dataServiceSupcust = this.completerService.remote('http://localhost:5000/api/supcust/filteredSupcusts?key=');
      this.dataServiceProduct = this.completerService.remote('http://localhost:5000/api/product/filteredProducts?key=');
      this.dataServiceUsers = this.completerService.remote('http://localhost:5000/api/user/FilteredUsers?key=');
      (<RemoteData>this.dataServiceUsers).requestOptions({
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      });
    }, 800);
  }
  onAdd() {
    this.projectTypeService.getUsersProjectId(this.projectTitle, this.supcustName, this.productName, this.userName)
    .subscribe((_header: any) => {
      this.headerId = _header;
      this.saveState = '1';
    }, error => {
      this.saveState = error.error;
    }, () => {
      this.router.navigate([this.headerId], { relativeTo: this.route });
    })
  }
  onEdit() {
    this.projectTypeService.getUsersProjectId(this.projectTitle, this.supcustName, this.productName, this.userName)
    .subscribe((_header: any) => {
      this.headerId = _header;
      this.saveState = '1';
    }, error => {
      this.saveState = error.error;
    }, () => {
      this.router.navigate([this.headerId], { relativeTo: this.route });
    })
  }
  tabs: any[] = [
    {
      title: 'Route tab #1',
      route: '/pages/layout/tabs/tab1',
    },
    {
      title: 'Route tab #2',
      route: '/pages/layout/tabs/tab2',
    },
  ];
}
