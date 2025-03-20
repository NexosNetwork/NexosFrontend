// src/app/views/orders/order.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderRoutingModule } from './order-routing.module';

@NgModule({
  declarations: [], // No need to declare ListComponent here
  imports: [
    CommonModule,
    OrderRoutingModule
  ]
})
export class OrderModule { }