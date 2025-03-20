// src/app/views/orders/orders-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { ProcessingComponent } from './processing/processing.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { HistoryComponent } from './history/history.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
  {
    path: 'list',
    component: ListComponent,
    data: { title: 'Order List', breadcrumb: 'List' }
  },
  {
    path: 'processing',
    component: ProcessingComponent,
    data: { title: 'Order Processing', breadcrumb: 'Processing' }
  },
  {
    path: 'analytics',
    component: AnalyticsComponent,
    data: { title: 'Order Analytics', breadcrumb: 'Analytics' }
  },
  {
    path: 'history',
    component: HistoryComponent,
    data: { title: 'Order History', breadcrumb: 'History' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }