// src/app/views/dashboard/dashboard-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConnectStoreComponent } from './connect-store/connect-store.component';
import { OrdersComponent } from './orders/orders.component';
import { StoresComponent } from './stores/stores.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'stores',
        component: StoresComponent,
        data: { title: 'Connect Store', breadcrumb: 'Connect Store' }
      },
      // {
      //   path: 'orders',
      //   children: [
      //     {
      //       path: 'list',
      //       component: ShopifyOrdersComponent,
      //       data: { title: 'Orders List', breadcrumb: 'Orders List' }
      //     }
      //   ]
      // },
      {
        path: '',
        redirectTo: 'stores',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }