// src/app/views/orders/order-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//import { ListComponent } from './list/list.component'; // Import ListComponent

const routes: Routes = [
  {
    path: 'list',
    //component: ListComponent, // Use ListComponent here
    data: { title: 'List', breadcrumb: 'List' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }