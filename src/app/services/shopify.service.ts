import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/compat/firestore';

interface ShopifyOrder {
  id: string;
  order_number: string;
  total_price: string;
  created_at: string;
  customer: {
    first_name: string;
    last_name: string;
    email: string;
  };
  line_items: Array<{
    title: string;
    quantity: number;
    price: string;
  }>;
  // Add other fields as needed
}

@Injectable({
  providedIn: 'root'
})
export class ShopifyService {
  constructor(
    private http: HttpClient,
    private firestore: AngularFirestore
  ) {}

  async fetchOrders(accessToken: string, shopDomain: string): Promise<{ orders: ShopifyOrder[] }> {
    const headers = new HttpHeaders({
      'X-Shopify-Access-Token': accessToken,
      'Content-Type': 'application/json'
    });

    return this.http.get<{ orders: ShopifyOrder[] }>(
      `https://${shopDomain}/admin/api/2024-01/orders.json`,
      { headers }
    ).toPromise();
  }

  async syncOrders(shopDomain: string, accessToken: string) {
    try {
      // Fetch orders from Shopify
      const response = await this.fetchOrders(accessToken, shopDomain);
      const orders = response.orders;  // Now TypeScript knows this is ShopifyOrder[]
      
      // Store each order in Firestore
      const batch = this.firestore.firestore.batch();
      
      orders.forEach(order => {
        const orderRef = this.firestore.firestore.doc(`orders/${order.id}`);
        batch.set(orderRef, {
          ...order,
          platform: 'shopify',
          shopDomain,
          timestamp: new Date(order.created_at),
        }, { merge: true });
      });

      await batch.commit();
      return true;
    } catch (error) {
      console.error('Error syncing orders:', error);
      throw error;
    }
  }
} 