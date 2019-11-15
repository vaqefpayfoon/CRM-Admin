import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../_services/project.service';
import { ProjectHeader } from '../../_models/project-header';
import { Pagination, PaginatedResult } from '../../_models/pagination';
import { ActivatedRoute } from '@angular/router';
import { SmartTableData } from '../../../@core/data/smart-table';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'ngx-smart-table',
  templateUrl: './smart-table.component.html'
})
export class SmartTableComponent implements OnInit {

  constructor(private project: ProjectService, private route: ActivatedRoute, private service: SmartTableData) {
    const data = this.service.getData();

  }
  projectHeaders: ProjectHeader[];
  pagination: Pagination;
  userParams: any[] = [];
  source: LocalDataSource = new LocalDataSource();
  ngOnInit() {
    this.route.data.subscribe(data => {
      this.projectHeaders = data['projectHeaders'].result;
      this.pagination = data['projectHeaders'].pagination;
      this.source.load(this.projectHeaders);
    });
  }

  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      projectTitle: {
        title: 'projectTitle',
        type: 'string',
      },
      supcustName: {
        title: 'supcustName',
        type: 'string',
      },
      productName: {
        title: 'productName',
        type: 'string',
      },
      userName: {
        title: 'userName',
        type: 'string',
      },
      toDoDate: {
        title: 'toDoDate',
        type: 'Date',
      },
    },
  };

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

}
