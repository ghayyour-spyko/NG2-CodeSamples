import { EditAccountComponent } from './editaccount/editaccount.component';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PageLoginComponent } from './extra-pages/login/login.component';
import { PageForgotPasswordComponent } from './extra-pages/forgot-password/forgot-password.component';
import { BlackoutsComponent } from './blackouts/blackouts.component';

// Page Layouts
import { PageLayoutFullscreenComponent } from './page-layouts/fullscreen/fullscreen.component';

const AppRoutes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'app', component: LayoutComponent },
  { path: 'login', component: PageLoginComponent },
  { path: 'blackouts', component: BlackoutsComponent },
  { path: 'edit-account', component: EditAccountComponent },
  { path: 'forgot-password', component: PageForgotPasswordComponent },
  { path: 'fullscreen', component: PageLayoutFullscreenComponent },
  { path: '**', redirectTo: '/app/dashboard', pathMatch: 'full' },
  
];

export const AppRoutingModule = RouterModule.forRoot(AppRoutes, {useHash: true});
