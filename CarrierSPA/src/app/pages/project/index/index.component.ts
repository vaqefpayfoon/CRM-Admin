import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../_services/project.service';
import { ProjectHeader } from '../../_models/project-header';
import { Pagination, PaginatedResult } from '../../_models/pagination';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-index',
  templateUrl: './index.component.html'
})
export class IndexComponent implements OnInit {

  constructor(private project: ProjectService, private route: ActivatedRoute) { }
  projectHeaders: ProjectHeader[];
  pagination: Pagination;
  userParams: any = {};
  ngOnInit() {
    this.route.data.subscribe(data => {
      this.projectHeaders = data['projectHeaders'].result;
      this.pagination = data['projectHeaders'].pagination;
    });
  }
  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadUsers();
  }

  loadUsers() {
    this.project.getAllProjectHeaders(this.pagination.currentPage, this.pagination.itemsPerPage, this.userParams)
      .subscribe((res: PaginatedResult<ProjectHeader[]>) => {
        this.projectHeaders = res.result;
        this.pagination = res.pagination;
    }, error => {

    });
  }
}
