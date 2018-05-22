import { EditAccountComponent } from './../editaccount/editaccount.component';

import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './layout.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { TableResponsiveComponent } from './../rates/responsive/responsive.component';
import { BlackoutsComponent } from './../blackouts/blackouts.component';

const routes: Routes = [
  {
    path: 'app',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'chart', loadChildren: '../charts/charts.module#ChartsModule' },
      { path: 'ecommerce', loadChildren: '../ecommerce/ecommerce.module#ECommerceModule' },
      { path: 'form', loadChildren: '../forms/forms.module#MyFormsModule' },
      { path: 'page', loadChildren: '../pages/pages.module#PagesModule' },
      { path: 'pglayout', loadChildren: '../page-layouts/page-layouts.module#PageLayoutsModule' },
      { path: 'table', loadChildren: '../tables/tables.module#MyTablesModule' },
      { path: 'ui', loadChildren: '../ui/ui.module#UIModule' },
    ]
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'rates', component: TableResponsiveComponent },
      { path: 'blackouts', component: BlackoutsComponent },
      { path: 'edit-account', component: EditAccountComponent },
    ]
  }
];

export const LayoutRoutingModule = RouterModule.forChild(routes);
