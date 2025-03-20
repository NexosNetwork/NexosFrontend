// src/app/views/dashboard/connect-store/connect-store.component.ts
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../../../environments/environment';
import { ShopifyService } from '../../../services/shopify.service';

@Component({
  selector: 'app-connect-store',
  template: `
    <div class="connect-store-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Connect Your Store</mat-card-title>
          <mat-card-subtitle>Choose your e-commerce platform to connect</mat-card-subtitle>
        </mat-card-header>

        <mat-card-content>
          <mat-form-field>
            <input matInput [(ngModel)]="shopifyDomain" 
                   placeholder="Enter your Shopify store domain">
          </mat-form-field>
          <div class="platform-grid">
            <!-- Shopify -->
            <mat-card class="platform-card">
              <mat-card-header>
                <mat-card-title>Shopify</mat-card-title>
              </mat-card-header>
              <mat-card-content>
                <mat-icon class="platform-icon">shopping_bag</mat-icon>
                <p>Connect your Shopify store to manage orders and products</p>
              </mat-card-content>
              <mat-card-actions>
                <button mat-raised-button color="primary" (click)="connectShopify(cleanShopifyDomain(shopifyDomain))">
                  Connect Shopify
                </button>
              </mat-card-actions>
            </mat-card>

            <!-- Amazon -->
            <mat-card class="platform-card">
              <mat-card-header>
                <mat-card-title>Amazon</mat-card-title>
              </mat-card-header>
              <mat-card-content>
                <mat-icon class="platform-icon">local_shipping</mat-icon>
                <p>Integrate your Amazon seller account</p>
              </mat-card-content>
              <mat-card-actions>
                <button mat-raised-button color="primary" (click)="connectAmazon()">
                  Connect Amazon
                </button>
              </mat-card-actions>
            </mat-card>

            <!-- TikTok -->
            <mat-card class="platform-card">
              <mat-card-header>
                <mat-card-title>TikTok Shop</mat-card-title>
              </mat-card-header>
              <mat-card-content>
                <mat-icon class="platform-icon">video_library</mat-icon>
                <p>Connect your TikTok shop</p>
              </mat-card-content>
              <mat-card-actions>
                <button mat-raised-button color="primary" (click)="connectTikTok()">
                  Connect TikTok
                </button>
              </mat-card-actions>
            </mat-card>

            <!-- WooCommerce -->
            <mat-card class="platform-card">
              <mat-card-header>
                <mat-card-title>WooCommerce</mat-card-title>
              </mat-card-header>
              <mat-card-content>
                <mat-icon class="platform-icon">store</mat-icon>
                <p>Connect your WooCommerce store</p>
              </mat-card-content>
              <mat-card-actions>
                <button mat-raised-button color="primary" (click)="connectWooCommerce()">
                  Connect WooCommerce
                </button>
              </mat-card-actions>
            </mat-card>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .connect-store-container {
      padding: 20px;
    }
    .platform-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 20px;
      padding: 20px 0;
    }
    .platform-card {
      text-align: center;
    }
    .platform-icon {
      font-size: 48px;
      height: 48px;
      width: 48px;
      margin: 20px 0;
    }
    mat-card-actions {
      padding: 16px;
    }
  `]
})
export class ConnectStoreComponent {
  shopifyDomain: string = '';

  constructor(
    private snackBar: MatSnackBar,
    private shopifyService: ShopifyService
  ) {}

  cleanShopifyDomain(domain: string): string | null {
    if (!domain) return null;
    
    // Remove protocol if present
    domain = domain.replace(/^https?:\/\//, '');
    
    // Remove trailing slash
    domain = domain.replace(/\/$/, '');
    
    // Validate domain format
    const validDomainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]*\.myshopify\.com$/;
    if (!validDomainRegex.test(domain)) {
      return null;
    }
    
    return domain;
  }

  connectShopify(domain: string | null) {
    if (!domain) {
      this.showMessage('Please enter a valid Shopify store domain');
      return;
    }

    const state = this.generateRandomState();
    sessionStorage.setItem('shopify_oauth_state', state);
    
    const shopifyAuthUrl = new URL(`https://${domain}/admin/oauth/authorize`);
    shopifyAuthUrl.searchParams.append('client_id', environment.shopify.clientId);
    shopifyAuthUrl.searchParams.append('scope', environment.shopify.scopes);
    shopifyAuthUrl.searchParams.append('redirect_uri', environment.shopify.redirectUri);
    shopifyAuthUrl.searchParams.append('state', state);

    window.location.href = shopifyAuthUrl.toString();
  }

  connectAmazon() {
    this.showMessage('Amazon integration coming soon');
  }

  connectTikTok() {
    this.showMessage('TikTok Shop integration coming soon');
  }

  connectWooCommerce() {
    this.showMessage('WooCommerce integration coming soon');
  }

  private generateRandomState(): string {
    return Math.random().toString(36).substring(2);
  }

  private showMessage(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000
    });
  }
}