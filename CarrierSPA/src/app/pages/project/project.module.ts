import { NgModule } from "@angular/core";
import { Ng2CompleterModule } from "ng2-completer";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbCardModule, NbButtonModule, NbAlertModule, NbCalendarModule, NbSelectModule, NbDatepickerModule,
  NbCheckboxModule, NbTabsetModule, NbProgressBarModule, NbUserModule, NbIconModule, NbListModule} from '@nebular/theme';
import { CommonModule } from '@angular/common';
import { FileUploadModule } from 'ng2-file-upload';
import { AuthGuard } from '../_guards/auth.guard';
import { ProjectTypeComponent } from './project-type/project-type.component';
import { ProjectTypeFormComponent } from './project-type-form/project-type-form.component';
import { ProjectRoutingModule } from './project-routing.module';
import { ProjectComponent } from './project.component';
import { ProjectHeaderComponent } from './project-header/project-header.component';
import { ProjectHeaderFormComponent } from './project-header-form/project-header-form.component';
import { ProjectTypeResolver } from '../_resolvers/project-type.resolver';
import { ProjectHeaderResolver } from '../_resolvers/project-header.resolver';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { ProjectDetailFormComponent } from './project-detail-form/project-detail-form.component';
import { ProjectDetailResolver } from '../_resolvers/project-detail.resolver';
import { ProjectFinanceResolver } from '../_resolvers/project-finance.resolver';
import { BsDropdownModule, TabsModule, BsDatepickerModule, PaginationModule,
  ButtonsModule } from 'ngx-bootstrap';
import { IndexComponent } from './index/index.component';
import { ProjectHeadersResolver } from '../_resolvers/project-headers.resolver';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { SmartTableComponent } from './smart-table/smart-table.component';
import { ChartPanelHeaderComponent } from './index/charts-panel/chart-panel-header/chart-panel-header.component';
import { ChartPanelSummaryComponent } from './index/charts-panel/chart-panel-summary/chart-panel-summary.component';
import { ECommerceChartsPanelComponent } from './index/charts-panel/charts-panel.component';
import { EarningCardComponent } from './index/earning-card/earning-card.component';
import { EarningCardBackComponent } from './index/earning-card/back-side/earning-card-back.component';
import { EarningCardFrontComponent } from './index/earning-card/front-side/earning-card-front.component';
import { ProfitCardComponent } from './index/profit-card/profit-card.component';
import { StatsCardBackComponent } from './index/profit-card/back-side/stats-card-back.component';
import { StatsCardFrontComponent } from './index/profit-card/front-side/stats-card-front.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { OrdersChartComponent } from './index/charts-panel/charts/orders-chart.component';
import { ChartModule } from 'angular2-chartjs';
import { ECommerceLegendChartComponent } from './index/legend-chart/legend-chart.component';
import { ThemeModule } from '../../@theme/theme.module';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { ProfitChartComponent } from './index/charts-panel/charts/profit-chart.component';
import { EarningLiveUpdateChartComponent } from './index/earning-card/front-side/earning-live-update-chart.component';
import { EarningPieChartComponent } from './index/earning-card/back-side/earning-pie-chart.component';
import { StatsAreaChartComponent } from './index/profit-card/back-side/stats-area-chart.component';
import { StatsBarAnimationChartComponent } from './index/profit-card/front-side/stats-bar-animation-chart.component';
import { ECommerceUserActivityComponent } from './index/user-activity/user-activity.component';
import { ECommerceVisitorsAnalyticsChartComponent } from './index/visitors-analytics/visitors-analytics-chart/visitors-analytics-chart.component';
import { ECommerceVisitorsStatisticsComponent } from './index/visitors-analytics/visitors-statistics/visitors-statistics.component';
import { ECommerceVisitorsAnalyticsComponent } from './index/visitors-analytics/visitors-analytics.component';
import { SlideOutComponent } from './index/slide-out/slide-out.component';
import { ChargeComponent } from './charge/charge.component';
import { ChargeFormComponent } from './charge-form/charge-form.component';
import { ChargeResolver } from '../_resolvers/charge.resolver';

@NgModule({
  imports: [
    Ng2CompleterModule, FormsModule, ProjectRoutingModule, NbCardModule, NbButtonModule, ReactiveFormsModule,
     CommonModule, NbAlertModule, NbCalendarModule, NbSelectModule, NbDatepickerModule.forRoot(), FileUploadModule, NbCheckboxModule, NbTabsetModule, PaginationModule.forRoot(),
     Ng2SmartTableModule,
     NbProgressBarModule,
     ThemeModule,
     NbCardModule,
     NbUserModule,
     NbButtonModule,
     NbIconModule,
     NbTabsetModule,
     NbSelectModule,
     NbListModule,
     ChartModule,
     NbProgressBarModule,
     NgxEchartsModule,
     NgxChartsModule,
     LeafletModule,
  ],
  declarations: [
    ProjectComponent,
    ProjectHeaderComponent,
    ProjectHeaderFormComponent,
    ProjectTypeComponent,
    ProjectTypeFormComponent,
    ProjectDetailComponent,
    ProjectDetailFormComponent,
    IndexComponent,
    SmartTableComponent,
    ChartPanelHeaderComponent,
    ChartPanelSummaryComponent,
    ECommerceChartsPanelComponent,
    EarningCardComponent, StatsAreaChartComponent, StatsBarAnimationChartComponent,
    EarningCardBackComponent, SlideOutComponent,
    EarningCardFrontComponent, EarningPieChartComponent,
    ProfitCardComponent, ProfitChartComponent, EarningLiveUpdateChartComponent,
    StatsCardBackComponent, ECommerceUserActivityComponent, ECommerceVisitorsAnalyticsChartComponent, ECommerceVisitorsStatisticsComponent, ECommerceVisitorsAnalyticsComponent,
    StatsCardFrontComponent, OrdersChartComponent, ECommerceLegendChartComponent, ChargeComponent, ChargeFormComponent

  ],
  providers: [
    AuthGuard, ProjectTypeResolver, ProjectHeaderResolver, ProjectDetailResolver, ProjectFinanceResolver,
    ProjectHeadersResolver, ChargeResolver
  ]
})
export class ProjectModule {
}
