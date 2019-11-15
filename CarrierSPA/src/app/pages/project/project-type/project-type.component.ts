import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CompleterService, CompleterData, RemoteData } from 'ng2-completer';
import { ProjectTypeService } from '../../_services/project-type.service';
import { ProjectType } from '../../_models/project-type';
import { StringModel } from '../../_models/dropDown';

@Component({
  selector: 'ngx-project-type',
  templateUrl: './project-type.component.html'
})
export class ProjectTypeComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private completerService: CompleterService,
    private projectTypeService: ProjectTypeService) { }
  formStatus: string = 'nothing';
  protected projectTitle: string;
  protected dataService: CompleterData;
  projectType: ProjectType;
  saveState: string = "0";
  ngOnInit() {
    setTimeout(() => {
      this.dataService = this.completerService.remote('http://localhost:5000/api/projectType/filteredProjectType?key=');
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
    this.projectTypeService.getProjectType(this.projectTitle, 'name').subscribe((_projectType: ProjectType) => {
      this.projectType = _projectType;
    }, error => {
      console.log(error);
    }, () => {
      this.router.navigate([this.projectType.id], { relativeTo: this.route });
    })
  }
  onDelete() {
    let name: StringModel = {id: '', name: this.projectTitle};
    this.projectTypeService.deleteProjectType(name).subscribe(() => {
      this.saveState = '1';
    }, error => {
      this.saveState = error.error;
    }, () => {

    })
  }

}
