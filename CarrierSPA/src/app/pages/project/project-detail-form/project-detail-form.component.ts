import { Component, OnInit, ViewChild } from '@angular/core';
import { ProjectDetail } from '../../_models/project-detail';
import { ProjectService } from '../../_services/project.service';
import { ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../_services/auth.service';
import { ProjectFinance } from '../../_models/project-finance';
import { DropDown } from '../../_models/dropDown';

@Component({
  selector: 'ngx-project-detail-form',
  templateUrl: './project-detail-form.component.html'
})
export class ProjectDetailFormComponent implements OnInit {

  constructor(public projectHeaderService: ProjectService, private route: ActivatedRoute, private fb: FormBuilder) { }
  saveState: string = "0";
  projectDetail: ProjectDetail;
  projectFinance: ProjectFinance;
  baseForm: FormGroup;
  detailForm: FormGroup;
  _id: any;
  datePicker: Date;
  datePicker1: Date;
  datePicker2: Date;
  stateArr : DropDown[] = [{id: '0', name:'Invoice'}, {id: '1', name: 'Factors'}];

  ngOnInit() {
    this.route.params.subscribe(
      (param: Params) => {
        this._id = param['id'];
        if(this._id != -1) {
          this.route.data.subscribe(data => {
            this.projectDetail = data['projectDetail'];
            this.projectFinance = data['projectFinance'];
          });
        }
      }, error => {console.log(error)}, () => {
      })

    this.createBaseForm();
    setTimeout(() => {
      this._id != -1 ? this.baseForm.patchValue(this.projectDetail) : this.baseForm.reset();
      this._id != -1 ? this.baseForm.patchValue({'finishDate': new Date(this.projectDetail.finishDate),
      'dateRefer': new Date(this.projectDetail.dateRefer)}) : this.baseForm.reset();
      this._id != -1 ? this.detailForm.patchValue(this.projectFinance) : this.detailForm.reset();
      this._id != -1 ? this.detailForm.patchValue({'factorDate': new Date(this.projectFinance.factorDate),
        'projectState': this.projectFinance.projectState.toString()})
       : this.detailForm.reset();
    }, 900);
  }

  createBaseForm() {
    this.baseForm = this.fb.group({
      id: ['', []],
      moreInfo: ['', [Validators.required]],
      finishDate: [Date, [Validators.required]],
      finishProject: ['', [Validators.required]],
      dateRefer: [Date, [Validators.required]]
    });

    this.detailForm = this.fb.group({
      id: ['', []],
      factorNo: ['', [Validators.required]],
      factorDate: [Date, [Validators.required]],
      factorAmount: ['', [Validators.required]],
      discount: ['', [Validators.required]],
      tax: ['', [Validators.required]],
      projectState: ['', [Validators.required]],
    });
  }

  baseSubmit() {
    this.projectDetail = Object.assign({}, this.baseForm.value);
    this.projectHeaderService.updateDetailProject(this.projectDetail).subscribe(next => {
      this.saveState = '1';
    }, error => {
      this.saveState = error.error;
    });
  }

  detailSubmit() {
    this.projectFinance = Object.assign({}, this.detailForm.value);
    this.projectHeaderService.updateFinanceProject(this.projectFinance).subscribe(next => {
      this.saveState = '1';
    }, error => {
      this.saveState = error.error;
    });
  }

  finalAmount: number;
  leaveBox() {
    let newnum = ((+(this.detailForm.get('factorAmount').value -
    +this.detailForm.get('discount').value)) * +this.detailForm.get('tax').value) / 100;
    this.finalAmount = +this.detailForm.get('factorAmount').value - newnum;
    var t2 = document.getElementById('finalAmount') as HTMLInputElement;
    t2.value = this.finalAmount.toString();
  }
}
