import { Component, OnInit } from '@angular/core';
import { CompleterService, CompleterData } from 'ng2-completer';
import { ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../_models/user';
import { UserService } from '../../_services/user.service';
import { DropDown } from '../../_models/dropDown';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'ngx-user-form',
  templateUrl: './user-form.component.html'
})
export class UserFormComponent implements OnInit {

  constructor(public userService: UserService, private completerService: CompleterService, private route: ActivatedRoute, private fb: FormBuilder) { }

  userRoleArr : DropDown[] = [{id: '0', name:'Sales'}, {id: '1', name: 'Service'}, {id: '2', name:'SalesAdmin'},
   {id: '3', name: 'ServiceAdmin'}, {id: '4', name: 'FullAcceess'}];
  datePipe = new DatePipe('en-US');
  saveState: string = "0";
  protected dataService: CompleterData;
  user: User;
  baseForm: FormGroup;
  _id: any;
  userId: any;
  ngOnInit() {
    this.route.params.subscribe(
      (param: Params) => {
        this._id = param['id'];
        if(this._id != -1) {
          this.route.data.subscribe(data => {
            this.user = data['user'];
          });
        }
      }, error => {console.log(error)}, () => {

      }
    )
    this.createBaseForm();
    setTimeout(() => {
      this.dataService = this.completerService.remote('http://localhost:5000/api/entity/filteredCities?key=');
      this._id != -1 ? this.baseForm.patchValue(this.user) : this.baseForm.reset();
      let date1: Date = new Date(this.user.dateOfBirth)
      this._id != -1 ? this.baseForm.patchValue({'userRole': this.user.userRole.toString(),
       'dateOfBirth': this.datePipe.transform(date1)}) : this.baseForm.reset();
    }, 900);
  }

  createBaseForm() {
    if(this._id == -1) {
      this.baseForm = this.fb.group({
        username: ['', [Validators.required]],
        fullName: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
        confirmPassword: ['', Validators.required],
        nationalCode: [''],
        cityName: [''],
        dateOfBirth: [Date, Validators.required],
        userRole: ['', Validators.required],
        email: [''],
        phone: [''],
        file: [''],
        moreInfo: [''],
      }, {validator: this.passwordMatchValidator});
    } else {
      this.baseForm = this.fb.group({
        id: ['', []],
        username: ['', [Validators.required]],
        fullName: ['', Validators.required],
        password: ['', [ Validators.minLength(4), Validators.maxLength(8)]],
        confirmPassword: [''],
        nationalCode: ['', Validators.required],
        cityName: ['', Validators.required],
        dateOfBirth: [Date, Validators.required],
        userRole: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', Validators.required],
        file: [''],
        moreInfo: [''],
      }, {validator: this.passwordMatchValidator});
    }

  }
  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value ? null : {'mismatch': true};
  }

  baseSubmit() {
    this.user = Object.assign({}, this.baseForm.value);
    if(this._id == -1) {
      this.userService.saveUser(this.user).subscribe(next => {
        this.saveState = '1';
        this.userId = this.userService.userId;
      }, error => {
        this.saveState = error.error;
      }, () => {
        this.userService.savePhoto(this.fileToUpload, this.userId).subscribe(next => {
          this.saveState = '1';
        }, error => {
          this.saveState = error.error;
        });
      });
    } else {
      this.userService.updateUser(this.user).subscribe(next => {
        this.saveState = '1';
      }, error => {
        this.saveState = error.error;
      });
    }
  }
  fileToUpload: File = null;
  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

}
