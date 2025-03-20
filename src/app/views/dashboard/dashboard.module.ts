import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { ConnectStoreComponent } from './connect-store/connect-store.component';
import { OrdersComponent } from './orders/orders.component';
import { ShopifyService } from '../../services/shopify.service';
import { StoresComponent } from './stores/stores.component';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [
    ConnectStoreComponent,
    OrdersComponent,
    StoresComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatTableModule,
    DashboardRoutingModule,
    MatPaginatorModule,
  ],
  providers: [
    ShopifyService
  ]
})
export class DashboardModule { }