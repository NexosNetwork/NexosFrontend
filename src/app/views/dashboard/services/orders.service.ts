import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserStorageService } from 'app/services/storage/user-storage.service';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

export interface ShopifyOrderDTO {
  id: string;
  orderNumber: string;
  totalPrice: number;
  currency: string;
  createdAt: string;
  updatedAt?: string;
  financialStatus: string;
  fulfillmentStatus?: string;
  email: string;
  totalDiscounts: number;
  totalTax: number;
  // If you want to display customer info or platform, you can include extra fields:
  customer?: {
    first_name: string;
    last_name: string;
  };
  platform?: string;
}

export interface Page<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  // Adjust the baseUrl as needed.
  
  private baseUrl = `${environment.BASIC_URL}api/shopify/orders`;
  //private baseUrl = 'http://localhost:8080/api/shopify/orders';

  constructor(private http: HttpClient) { }

  getOrders(page: number = 0, size: number = 10): Observable<Page<ShopifyOrderDTO>> {
    const params = new HttpParams()
      .set('userId', UserStorageService.getUserId())
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<Page<ShopifyOrderDTO>>(this.baseUrl, { params });
  }
}
