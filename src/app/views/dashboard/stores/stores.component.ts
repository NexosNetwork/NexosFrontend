import { HttpParams } from '@angular/common/http';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { IntegrationService } from 'app/services/integration/integration.service';
import { ShopifyService } from 'app/services/shopify.service';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrl: './stores.component.scss'
})
export class StoresComponent {
 shopifyDomain: string = '';

  constructor(
    private snackBar: MatSnackBar,
    private integrationService: IntegrationService,
    private dialog: MatDialog,
    private route: ActivatedRoute
  ) {}


  ngOnInit(){
     // Check if there are query parameters to display a status modal
     this.route.queryParams.subscribe(params => {
      console.log(params)
      if (params.status === 'success') {
        this.showStatusModal('Success', 'Account connected successfully.');
      } else if (params.status === 'error') {
        this.showStatusModal('Error', 'We got an error, try again.');
      }
    });
  this.getIntegrationPlatforms("");
}

// Get a reference to the ng-template in the HTML
@ViewChild('shopifyDialogTemplate') shopifyDialogTemplate: TemplateRef<any>;
@ViewChild('statusDialogTemplate', { static: true }) statusDialogTemplate: TemplateRef<any>;


connectShopify(cleanDomain: string) {
  // Open a dialog with a template reference
  const dialogRef = this.dialog.open(this.shopifyDialogTemplate, {
    width: '400px',
    data: { shopName: cleanDomain }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      console.log('Shopify shop name:', result);
      this.integrationService.getShopifyInstallUrl(result).subscribe(
        response => {
          // Process the response, e.g., redirect to the install URL or update your UI
          console.log('Install URL response:', response);
          // For example, redirect:
          // window.location.href = response.installUrl;
          window.open(response.installUrl, '_blank');
        },
        error => {
          console.error('Error fetching install URL:', error);
        }
      );
    }
  });
}

connectStore(store: any) {
  if (store.name === 'Shopify') {
    // Call your Shopify connect logic, e.g.:
    this.connectShopify(this.cleanShopifyDomain(this.shopifyDomain));
  } else {
    this.showMessage(`${store.name} integration coming soon`);
  }
  // Add additional logic for other platforms as needed
}


cleanShopifyDomain(domain: string): string {
  return domain.trim();
}

  usersData: any[];
  currentPage = 0;
  pageSize = 10;
  sizeFromBackend = 10;
  totalElementsFromBackend = 0;
  isSpinning: boolean = false;

  getIntegrationPlatforms(name: string) {
    const params = new HttpParams()
      .set('page', this.currentPage.toString())
      .set('name', name)
      .set('size', this.pageSize.toString());
     

    this.integrationService.searchIntegrationPlatforms(params)
      .subscribe((page: any) => {
        console.log("page", page);
        this.usersData = page.content;
        this.sizeFromBackend = page.size;
        this.totalElementsFromBackend = page.totalElements;
      }, error=>{

      });
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

  private showStatusModal(title: string, message: string) {
    this.statusDialogRef = this.dialog.open(this.statusDialogTemplate, {
      width: '400px',
      data: { title, message }
});

  }

    // Manually closes the status dialog
    closeStatusDialog() {
      if (this.statusDialogRef) {
        this.statusDialogRef.close();
      }
    }

   // Store the dialog reference for manual closing
   private statusDialogRef: MatDialogRef<any>;

}