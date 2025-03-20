import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// Add these interfaces at the top of the file
interface IMenuItem {
  type: 'link' | 'dropDown' | 'icon' | 'separator' | 'extLink';
  name?: string;
  state?: string;
  icon?: string;
  svgIcon?: string;
  tooltip?: string;
  disabled?: boolean;
  sub?: IChildItem[];
  badges?: IBadge[];
}

interface IChildItem {
  type?: string;
  name: string;
  state?: string;
  icon?: string;
  svgIcon?: string;
  sub?: IChildItem[];
}

interface IBadge {
  color: string;
  value: string;
}

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  iconTypeMenuTitle = 'Frequently Accessed';

  plainMenu: IMenuItem[] = [
    {
      name: 'Dashboard',
      type: 'dropDown',
      icon: 'insights',
      state: '/dashboard',
      tooltip: 'Dashboard & Store Connection',
      sub: [
        {
          name: 'Connect Your Store',
          state: '/dashboard/stores',
          icon: 'insights'
        },
      ]
    },
    {
      name: 'Orders',
      type: 'dropDown',
      icon: 'receipt_long',
      state: '/orders',
      sub: [
        {
          name: 'All Orders',
          state: '/orders/list',
          icon: 'list_alt'
        },
        {
          name: 'Order Processing',
          state: '/orders/processing',
          icon: 'pending_actions'
        },
        {
          name: 'Order Analytics',
          state: '/orders/analytics',
          icon: 'analytics'
        },
        {
          name: 'Order History',
          state: '/orders/history',
          icon: 'history'
        }
      ]
    },
    {
      name: 'E-commerce',
      type: 'dropDown',
      icon: 'shopping_cart',
      state: '/ecommerce',
      sub: [
        {
          name: 'Products',
          state: '/ecommerce/products',
          icon: 'list_alt'
        },
        {
          name: 'Products Details',
          state: '/ecommerce/product-details',
          icon: 'pending_actions'
        },
        {
          name: 'Cart',
          state: '/ecommerce/cart',
          icon: 'analytics'
        },
        {
          name: 'Checkout',
          state: '/ecommerce/checkout',
          icon: 'history'
        }
      ]
    },
    {
      name: 'Settings',
      type: 'dropDown',
      icon: 'settings',
      state: 'settings',
      sub: [
        { 
          name: 'User Profile',
          state: '/settings/profile',
          icon: 'person'
        }
      ]
    },
    {
      name: 'Help & Support',
      type: 'dropDown',
      icon: 'help',
      state: '/help',
      sub: [
        {
          name: 'FAQ',
          state: '/help/faq',
          icon: 'api'
        },
        {
          name: 'User Guide',
          state: '/help/user-guide',
          icon: 'store'
        },
        {
          name: 'Contact Support',
          state: '/help/contact-support',
          icon: 'person'
        }
      ]
    }
  ];

  // For demonstration/documentation
  separatorMenu: IMenuItem[] = [
    {
      type: 'separator',
      name: 'E-commerce Integration'
    },
    ...this.plainMenu
  ];

  menuItems = new BehaviorSubject<IMenuItem[]>(this.plainMenu);
  menuItems$ = this.menuItems.asObservable();

  constructor() {}

  publishNavigationChange(menuType: string) {
    switch (menuType) {
      case 'separator-menu':
        this.menuItems.next(this.separatorMenu);
        break;
      default:
        this.menuItems.next(this.plainMenu);
    }
  }
}