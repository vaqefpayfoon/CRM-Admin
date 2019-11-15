import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CompleterService, CompleterData, RemoteData } from 'ng2-completer';
import {  NameModel } from '../../_models/dropDown';
import { User } from '../../_models/user';
import { UserService } from '../../_services/user.service';

@Component({
  selector: 'ngx-user',
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private completerService: CompleterService, private userService: UserService) { }
  formStatus: string = 'nothing';
  protected userName: string;
  protected dataService: CompleterData;
  user: User;
  saveState: string = "0";
  ngOnInit() {
    setTimeout(() => {
      this.dataService = this.completerService.remote('http://localhost:5000/api/user/filteredUsers?key=');
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
    this.userService.getUser(this.userName, 'name').subscribe((_user: User) => {
      this.user = _user;
      this.saveState = '1';
    }, error => {
      this.saveState = error.error;
    }, () => {
      this.router.navigate([this.user.id], { relativeTo: this.route });
    })
  }
  onDelete() {
    let name: NameModel = {name: this.userName};
    this.userService.deleteUser(name).subscribe(() => {
      this.saveState = '1';
    }, error => {
      this.saveState = error.error;
    }, () => {
    })
  }

}
