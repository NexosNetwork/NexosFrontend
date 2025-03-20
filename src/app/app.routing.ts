import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './shared/components/layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './shared/components/layouts/auth-layout/auth-layout.component';
import { AuthGuard } from './shared/guards/auth.guard';

export const rootRouterConfig: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'sessions',
        loadChildren: () => import('./views/sessions/sessions.module').then(m => m.SessionsModule),
        data: { title: 'Session' }
      }
    ]
  },
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule),
        data: { title: 'Dashboard', breadcrumb: 'Dashboard' }
      },
      {
        path: 'orders',
        loadChildren: () => import('./views/orders/orders.module').then(m => m.OrdersModule),
        data: { title: 'Orders', breadcrumb: 'Orders' }
      },
      {
        path: 'ecommerce',
        loadChildren: () => import('./views/ecommerce/ecommerce.module').then(m => m.EcommerceModule),
        data: { title: 'E-commerce', breadcrumb: 'E-commerce' }
      },
      {
        path: 'settings',
        loadChildren: () => import('./views/settings/settings.module').then(m => m.SettingsModule),
        data: { title: 'Settings', breadcrumb: 'Settings' }
      },
      {
        path: 'help',
        loadChildren: () => import('./views/help/help.module').then(m => m.HelpModule),
        data: { title: 'Help', breadcrumb: 'Help' }
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'sessions/404'
  }
];