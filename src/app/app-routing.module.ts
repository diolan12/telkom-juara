import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './_data/guard/auth.guard';

import { LoginComponent } from './component/login/login.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';

import { NotFoundComponent } from './error/not-found/not-found.component';
import { SharedHomeComponent } from './component/_shared/shared-home/shared-home.component';

import { OrderComponent } from './component/_shared/operation/order/order.component';
import { CustomerComponent } from './component/_shared/operation/customer/customer.component';
import { AccountComponent } from './component/_shared/operation/account/account.component';
import { ServiceComponent } from './component/_shared/operation/service/service.component';

import { AdminComponent } from './component/dashboard/admin/admin.component';
// import { AccountComponent } from './component/dashboard/admin/account/account.component';
import { SettingComponent } from './component/dashboard/admin/setting/setting.component';

import { FieldComponent } from './component/dashboard/field/field.component';

import { OfficeComponent } from './component/dashboard/office/office.component';
import { ProfileComponent } from './component/dashboard/profile/profile.component';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard', canActivate: [AuthGuard], component: DashboardComponent, children: [
      {
        path: 'admin', component: AdminComponent, children: [
          { path: '', redirectTo: 'home', pathMatch: 'full' },
          { path: 'home', component: SharedHomeComponent },
          { path: 'account', component: AccountComponent },
          { path: 'setting', component: SettingComponent }
        ]
      },
      {
        path: 'office', component: OfficeComponent, children: [
          { path: '', redirectTo: 'home', pathMatch: 'full' },
          { path: 'home', component: SharedHomeComponent },
          { path: 'order', component: OrderComponent },
          { path: 'customer', component: CustomerComponent },
          { path: 'service', component: ServiceComponent },
          { path: 'field', component: AccountComponent }
        ]
      },
      {
        path: 'field', component: FieldComponent, children: [
          { path: '', redirectTo: 'home', pathMatch: 'full' },
          { path: 'home', component: SharedHomeComponent },
        ]
      }
    ]
  },
  { path: 'profile', canActivate: [AuthGuard], component: ProfileComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
