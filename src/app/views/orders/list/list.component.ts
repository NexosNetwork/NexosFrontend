// src/app/views/orders/list/list.component.ts
import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { OrdersService, Page, ShopifyOrderDTO } from 'app/views/dashboard/services/orders.service';
import { OrderDetailsComponent } from '../order-details/order-details.component';
import { MatDialog } from '@angular/material/dialog';

export interface Order {
  id?: string; // Firestore document ID
  orderNumber: string;
  storeName: string;
  customerName: string;
  status: string;
  total: number;
}

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule
  ],
  template: `
    <div class="orders-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Orders</mat-card-title>
        </mat-card-header>

        <mat-card-content>
          <table mat-table [dataSource]="orders" matSort>
            <!-- Order Number Column -->
            <ng-container matColumnDef="orderNumber">
              <th mat-header-cell *matHeaderCellDef mat-sort-header> Order # </th>
              <td mat-cell *matCellDef="let order"> {{order.orderNumber}} </td>
            </ng-container>

            <!-- Store Column -->
            <ng-container matColumnDef="date">
              <th mat-header-cell *matHeaderCellDef mat-sort-header> Date </th>
              <td mat-cell *matCellDef="let order"> {{order.createdAt | date}} </td>
            </ng-container>

            <!-- Customer Column -->
            <ng-container matColumnDef="customer">
              <th mat-header-cell *matHeaderCellDef mat-sort-header> Customer </th>
              <td mat-cell *matCellDef="let order"> {{order.email}} </td>
            </ng-container>

            <!-- Status Column -->
            <ng-container matColumnDef="status">
              <th mat-header-cell *matHeaderCellDef mat-sort-header> Status </th>
              <td mat-cell *matCellDef="let order">
                <span [class]="'status-badge ' + order.financialStatus">{{order.financialStatus}}</span>
              </td>
            </ng-container>

            <!-- Total Column -->
            <ng-container matColumnDef="total">
              <th mat-header-cell *matHeaderCellDef mat-sort-header> Total </th>
              <td mat-cell *matCellDef="let order"> {{order.totalPrice }} {{order.currency}}</td>
            </ng-container>

            <!-- Actions Column -->
            <ng-container matColumnDef="actions">
              <th mat-header-cell *matHeaderCellDef> Actions </th>
              <td mat-cell *matCellDef="let order">
                <button mat-icon-button [matMenuTriggerFor]="menu">
                  <mat-icon>more_vert</mat-icon>
                </button>
                <mat-menu #menu="matMenu">
                  <button mat-menu-item (click)="viewOrder(order)">
                    <mat-icon>visibility</mat-icon>
                    <span>View Details</span>
                  </button>
                  <button mat-menu-item (click)="processOrder(order)">
                    <mat-icon>edit</mat-icon>
                    <span>Process Order</span>
                  </button>
                </mat-menu>
              </td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
          </table>

          <mat-paginator [pageSizeOptions]="[5, 10, 25, 100]"></mat-paginator>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .orders-container {
      padding: 20px;
    }
    table {
      width: 100%;
    }
    .status-badge {
      padding: 4px 8px;
      border-radius: 4px;
      text-transform: capitalize;
    }
    .status-badge.pending {
      background-color: #ffd740;
    }
    .status-badge.processing {
      background-color: #2196f3;
      color: white;
    }
    .status-badge.shipped {
      background-color: #9c27b0;
      color: white;
    }
    .status-badge.paid {
      background-color: #4caf50;
      color: white;
    }
  `]
})
export class ListComponent implements OnInit {
  displayedColumns: string[] = ['orderNumber', 'date', 'customer', 'status', 'total', 'actions'];
  dataSource: MatTableDataSource<Order>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  orders: ShopifyOrderDTO[];

    // Pagination properties
    page = 0;
    size = 10;
    totalElements = 0;
  
    // Change this userId value as needed or obtain it from the route/authentication.
    userId = 123;
  
    constructor(private orderService: OrdersService,
      private dialog: MatDialog
    ) { }
  
    ngOnInit(): void {
      this.loadOrders();
    }
  
    loadOrders(): void {
      this.orderService.getOrders(this.page, this.size).subscribe((response: Page<ShopifyOrderDTO>) => {
        // response.content holds the list of orders.
        // this.orders = new Observable<ShopifyOrderDTO[]>(subscriber => {
        //   subscriber.next(response.content);
        //   subscriber.complete();
        // });
        this.orders = response.content;
        this.totalElements = response.totalElements;
      });
    }
  
    onPageChange(event: PageEvent): void {
      this.page = event.pageIndex;
      this.size = event.pageSize;
      this.loadOrders();
    }

  viewOrder(order: Order) {
    console.log('View order:', order);
    this.dialog.open(OrderDetailsComponent, {
      width: '800px',
      data: order
    });
  }

  processOrder(order: Order) {
    console.log('Process order:', order);
  }
}