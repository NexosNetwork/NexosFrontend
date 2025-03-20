import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-orders',
  template: `
    <div class="orders-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Orders</mat-card-title>
        </mat-card-header>

        <mat-card-content>
          <table mat-table [dataSource]="orders$ | async" class="orders-table">
            <!-- Order Number Column -->
            <ng-container matColumnDef="order_number">
              <th mat-header-cell *matHeaderCellDef> Order # </th>
              <td mat-cell *matCellDef="let order"> {{order.order_number}} </td>
            </ng-container>

            <!-- Customer Column -->
            <ng-container matColumnDef="customer">
              <th mat-header-cell *matHeaderCellDef> Customer </th>
              <td mat-cell *matCellDef="let order"> 
                {{order.customer?.first_name}} {{order.customer?.last_name}}
              </td>
            </ng-container>

            <!-- Total Column -->
            <ng-container matColumnDef="total_price">
              <th mat-header-cell *matHeaderCellDef> Total </th>
              <td mat-cell *matCellDef="let order"> {{order.total_price | currency}} </td>
            </ng-container>

            <!-- Date Column -->
            <ng-container matColumnDef="created_at">
              <th mat-header-cell *matHeaderCellDef> Date </th>
              <td mat-cell *matCellDef="let order"> {{order.created_at | date}} </td>
            </ng-container>

            <!-- Platform Column -->
            <ng-container matColumnDef="platform">
              <th mat-header-cell *matHeaderCellDef> Platform </th>
              <td mat-cell *matCellDef="let order"> {{order.platform}} </td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
          </table>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .orders-container {
      padding: 20px;
    }
    .orders-table {
      width: 100%;
    }
    .mat-row:hover {
      background: #f5f5f5;
    }
  `]
})
export class OrdersComponent implements OnInit {
  orders$: Observable<any[]>;
  displayedColumns: string[] = ['order_number', 'customer', 'total_price', 'created_at', 'platform'];

  constructor(private firestore: AngularFirestore) {
    this.orders$ = this.firestore.collection('orders').valueChanges();
  }

  ngOnInit() {}
} 