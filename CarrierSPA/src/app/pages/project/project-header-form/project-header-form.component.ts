import { Component, OnInit} from '@angular/core';
import { ProjectService } from '../../_services/project.service';
import { ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompleterService, CompleterData, RemoteData } from 'ng2-completer';
import { ProjectHeader } from '../../_models/project-header';
import { AuthService } from '../../_services/auth.service';
import { DropDown } from '../../_models/dropDown';
import { SupcustGoodService } from '../../_services/supcustGood.service';
import { SupcustGood } from '../../_models/SupcustGood';
import { NbWindowService } from '@nebular/theme';

@Component({
  selector: 'ngx-header-form',
  templateUrl: './project-header-form.component.html'
})
export class ProjectHeaderFormComponent implements OnInit {

  constructor(public projectHeaderService: ProjectService, private route: ActivatedRoute, private fb: FormBuilder, private completerService: CompleterService, private authService: AuthService,
    private supcustGoodService: SupcustGoodService) { }
  protected projectTypeTitle: string;
  protected supcustName: string;
  protected productName: string;
  protected userName: string;
  protected dataServiceProject: CompleterData;
  protected dataServiceSupcust: CompleterData;
  protected dataServiceProduct: CompleterData;
  protected dataServiceUsers: CompleterData;
  saveState: string = "0";
  projectHeader: ProjectHeader;
  baseForm: FormGroup;
  _id: any;
  saleStateArr : DropDown[] = [{id: '0', name:'Follow'}, {id: '1', name: 'Clue'}, {id: '2', name:'Opportunity'}];
  role: string;
  ngOnInit() {
    this.role = this.authService.decodedToken.role;
    this.route.params.subscribe(
      (param: Params) => {
        this._id = param['id'];
        if(this._id != -1) {
          this.route.data.subscribe(data => {
            this.projectHeader = data['projectHeader'];
          });
        }
      }, error => {console.log(error)}, () => {

      }
    )

    this.createBaseForm();
    setTimeout(() => {
      this._id != -1 ? this.baseForm.patchValue(this.projectHeader) : this.baseForm.reset();
      this._id != -1 ? this.baseForm.patchValue({'toDoDate': new Date(this.projectHeader.toDoDate)})
       : this.baseForm.reset();
      this.dataServiceProject = this.completerService.remote('http://localhost:5000/api/projectType/filteredProjectType?key=');
      (<RemoteData>this.dataServiceProject).requestOptions({
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      });
      this.dataServiceSupcust = this.completerService.remote('http://localhost:5000/api/supcust/filteredSupcusts?key=');
      this.dataServiceProduct = this.completerService.remote('http://localhost:5000/api/product/filteredProducts?key=');
      this.dataServiceUsers = this.completerService.remote('http://localhost:5000/api/user/FilteredUsers?key=');
      this.baseForm.patchValue({'adminUserId': this.authService.decodedToken.nameid});
      (<RemoteData>this.dataServiceUsers).requestOptions({
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      });
    }, 900);
  }

  createBaseForm() {
    if(this._id == -1) {
      this.baseForm = this.fb.group({
        projectTitle: ['', [Validators.required]],
        supcustName: ['', [Validators.required]],
        productName: ['', [Validators.required]],
        adminUserId: ['', [Validators.required]],
        userName: ['', [Validators.required]],
        adminOrder: ['', [Validators.required]],
        toDoDate: [],
        saleState: [],
        projectActive: [''],
      });
    } else {
      this.baseForm = this.fb.group({
        id: ['', []],
        projectTitle: ['', [Validators.required]],
        supcustName: ['', [Validators.required]],
        productName: ['', [Validators.required]],
        adminUserId: ['', [Validators.required]],
        userName: ['', [Validators.required]],
        adminOrder: ['', [Validators.required]],
        toDoDate: [''],
        saleState: [],
        projectActive: [''],
      });
    }
  }

  baseSubmit() {
    this.projectHeader = Object.assign({}, this.baseForm.value);
    if(this._id == -1) {
      this.projectHeaderService.saveHeaderProject(this.projectHeader).subscribe(next => {
        this.saveState = '1';
      }, error => {
        this.saveState = error.error;
      });
    } else {
      this.projectHeaderService.updateHeaderProject(this.projectHeader).subscribe(next => {
        this.saveState = '1';
      }, error => {
        this.saveState = error.error;
      });
    }
  }
  names: SupcustGood[] = [];
  open3() {

    this.supcustGoodService.getSupcustsProducts(this.baseForm.get('supcustName').value).subscribe((_names: SupcustGood[]) => {
      this.names = _names;
    });
  }
}
