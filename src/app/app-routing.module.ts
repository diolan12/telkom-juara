import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './_data/guard/auth.guard';

import { LoginComponent } from './component/login/login.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';

import { NotFoundComponent } from './error/not-found/not-found.component';

import { AdminComponent } from './component/dashboard/admin/admin.component';
import { HomeComponent } from './component/dashboard/admin/home/home.component';
import { AccountComponent } from './component/dashboard/admin/account/account.component';
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
          { path: 'home', component: HomeComponent },
          { path: 'account', component: AccountComponent },
          { path: 'setting', component: SettingComponent }
        ]
      },
      { path: 'office', component: OfficeComponent },
      { path: 'field', component: FieldComponent }
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
