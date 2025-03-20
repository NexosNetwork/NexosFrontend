// src/app/services/store.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

// Add interfaces for type safety
interface Store {
  id: string;
  name: string;
  type: 'shopify' | 'amazon' | 'tiktok' | 'woocommerce';
  connected: boolean;
  createdAt: Date;
}

interface ShopifyCredentials {
  shopDomain: string;
}

interface WooCommerceCredentials {
  apiKey: string;
  apiSecret: string;
  storeUrl: string;
}

interface AmazonCredentials {
  sellerId: string;
  accessKey: string;
  secretKey: string;
}

interface TikTokCredentials {
  accessToken: string;
  shopId: string;
}

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private apiUrl = 'your-api-url'; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  connectShopify(credentials: ShopifyCredentials): Observable<Store> {
    return this.http.post<Store>(`${this.apiUrl}/connect/shopify`, credentials)
      .pipe(
        catchError(this.handleError)
      );
  }

  connectAmazon(credentials: AmazonCredentials): Observable<Store> {
    return this.http.post<Store>(`${this.apiUrl}/connect/amazon`, credentials)
      .pipe(
        catchError(this.handleError)
      );
  }

  connectTikTok(credentials: TikTokCredentials): Observable<Store> {
    return this.http.post<Store>(`${this.apiUrl}/connect/tiktok`, credentials)
      .pipe(
        catchError(this.handleError)
      );
  }

  connectWooCommerce(credentials: WooCommerceCredentials): Observable<Store> {
    return this.http.post<Store>(`${this.apiUrl}/connect/woocommerce`, credentials)
      .pipe(
        catchError(this.handleError)
      );
  }

  getConnectedStores(): Observable<Store[]> {
    return this.http.get<Store[]>(`${this.apiUrl}/stores`)
      .pipe(
        catchError(this.handleError)
      );
  }

  disconnectStore(storeId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/stores/${storeId}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateStoreCredentials(storeId: string, credentials: any): Observable<Store> {
    return this.http.patch<Store>(`${this.apiUrl}/stores/${storeId}`, credentials)
      .pipe(
        catchError(this.handleError)
      );
  }

  validateConnection(storeId: string): Observable<boolean> {
    return this.http.post<{valid: boolean}>(`${this.apiUrl}/stores/${storeId}/validate`, {})
      .pipe(
        map(response => response.valid),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An error occurred';
    
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      switch (error.status) {
        case 401:
          errorMessage = 'Unauthorized. Please check your credentials.';
          break;
        case 403:
          errorMessage = 'Access forbidden. Please check your permissions.';
          break;
        case 404:
          errorMessage = 'Store not found.';
          break;
        case 409:
          errorMessage = 'Store already connected.';
          break;
        default:
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
    }
    
    console.error('Store Service Error:', errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}