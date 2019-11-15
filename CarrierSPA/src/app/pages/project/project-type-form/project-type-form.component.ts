import { Component, OnInit } from '@angular/core';
import { ProjectTypeService } from '../../_services/project-type.service';
import { ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectType } from '../../_models/project-type';
import { AuthService } from '../../_services/auth.service';

@Component({
  selector: 'ngx-project-type-form',
  templateUrl: './project-type-form.component.html'
})
export class ProjectTypeFormComponent implements OnInit {

  constructor(public projectTypeService: ProjectTypeService, private route: ActivatedRoute, private fb: FormBuilder,
    private authService: AuthService) { }
  saveState: string = "0";
  projectType: ProjectType;
  baseForm: FormGroup;
  _id: any;
  roleType: string;
  ngOnInit() {
    this.route.params.subscribe(
      (param: Params) => {
        this._id = param['id'];
        if(this._id != -1) {
          this.route.data.subscribe(data => {
            this.projectType = data['projectType'];
          });
        }
      }, error => {console.log(error)}, () => {

      }
    )
    this.createBaseForm();
    setTimeout(() => {
      this._id != -1 ? this.baseForm.patchValue(this.projectType) : this.baseForm.reset();
    }, 900);
  }

  createBaseForm() {
    if(this._id == -1) {
      this.baseForm = this.fb.group({
        projectTitle: ['', [Validators.required]],
        roleState: [this.roleType]
      });
    } else {
      this.baseForm = this.fb.group({
        id: ['', []],
        projectTitle: ['', [Validators.required]],
        roleState: [this.roleType]
      });
    }
  }

  baseSubmit() {
    this.projectType = Object.assign({}, this.baseForm.value);
    this.roleType = this.authService.decodedToken.role;
    this.projectType.roleState = this.roleType;
    if(this._id == -1) {
      this.projectTypeService.saveProjectType(this.projectType).subscribe(next => {
        this.saveState = '1';
      }, error => {
        this.saveState = error.error;
      });
    } else {
      this.projectTypeService.updateProjectType(this.projectType).subscribe(next => {
        this.saveState = '1';
      }, error => {
        this.saveState = error.error;
      });
    }

  }

}
