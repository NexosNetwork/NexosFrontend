import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  template: `
    <div class="products-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Products</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <div class="product-grid">
            <!-- Add your product cards here -->
            <mat-card class="product-card" *ngFor="let product of products">
              <img mat-card-image [src]="product.image" [alt]="product.name">
              <mat-card-content>
                <h3>{{product.name}}</h3>
                <p>{{product.price | currency}}</p>
              </mat-card-content>
              <mat-card-actions>
                <button mat-button color="primary">View Details</button>
                <button mat-button color="accent">Add to Cart</button>
              </mat-card-actions>
            </mat-card>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .products-container {
      padding: 20px;
    }
    .product-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 20px;
      padding: 20px;
    }
    .product-card {
      max-width: 100%;
    }
    .product-card img {
      height: 200px;
      object-fit: cover;
    }
  `]
})
export class ProductsComponent implements OnInit {
  products = [
    {
      id: 1,
      name: 'Product 1',
      price: 99.99,
      image: 'assets/product1.jpg'
    },
    // Add more products
  ];

  constructor() { }

  ngOnInit(): void {
  }
}