import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
// src/app/views/orders/processing/processing.component.ts
@Component({
  selector: 'app-processing',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    // ... other material modules
  ],
  template: `
    <div class="processing-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Processing Orders</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <!-- Add processing orders content -->
        </mat-card-content>
      </mat-card>
    </div>
  `
})
export class ProcessingComponent {}