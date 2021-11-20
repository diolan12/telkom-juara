import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// ToastrModule
import { ToastrModule } from 'ngx-toastr';

// Material design modules
import { CdkTreeModule } from '@angular/cdk/tree';
import { FlexLayoutModule } from '@angular/flex-layout'
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';

// Component
import { NotFoundComponent } from './error/not-found/not-found.component';
import { LoginComponent } from './component/login/login.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { AdminComponent } from './component/dashboard/admin/admin.component';
import { FieldComponent } from './component/dashboard/field/field.component';
import { ProfileComponent } from './component/dashboard/profile/profile.component';
import { OfficeComponent } from './component/dashboard/office/office.component';
import { SettingComponent } from './component/dashboard/admin/setting/setting.component';
import { SharedSidenavComponent } from './component/_shared/shared-sidenav/shared-sidenav.component';
import { SharedFooterComponent } from './component/_shared/shared-footer/shared-footer.component';

// operation component
import { AccountComponent } from './component/_shared/operation/account/account.component';
import { CustomerComponent } from './component/_shared/operation/customer/customer.component';
import { OrderComponent } from './component/_shared/operation/order/order.component';
import { AttendanceComponent } from './component/_shared/operation/attendance/attendance.component';

// dialog
import { AccountDialogComponent } from './component/_shared/operation/account/dialog/account-dialog/account-dialog.component';
import { CustomerDialogComponent } from './component/_shared/operation/customer/dialog/customer-dialog/customer-dialog.component';
import { ServiceTypeDialogComponent } from './component/_shared/operation/service/dialog/service-type-dialog/service-type-dialog.component';
import { ServiceDialogComponent } from './component/_shared/operation/service/dialog/service-dialog/service-dialog.component';

// interceptor
import { AuthInterceptor } from "./_data/interceptor/auth.interceptor";

import { SharedHomeComponent } from './component/_shared/shared-home/shared-home.component';
import { ServiceComponent } from './component/_shared/operation/service/service.component';
import { OrderDialogComponent } from './component/_shared/operation/order/dialog/order-dialog/order-dialog.component';


const materialModules = [
	CdkTreeModule,
	FlexLayoutModule,
	FormsModule,
	ReactiveFormsModule,
	MatFormFieldModule,
	MatCardModule,
	MatIconModule,
	MatToolbarModule,
	MatInputModule,
	MatButtonModule,
	MatRadioModule,
	MatSidenavModule,
	MatListModule,
	MatDividerModule,
	MatMenuModule,
	MatProgressBarModule,
	MatProgressSpinnerModule,
	MatDialogModule,
	MatTableModule,
	MatSortModule,
	MatPaginatorModule,
	MatSelectModule,
	MatExpansionModule
]

@NgModule({
	declarations: [
		AppComponent,
		LoginComponent,
		DashboardComponent,
		AdminComponent,
		FieldComponent,
		ProfileComponent,
		NotFoundComponent,
		OfficeComponent,
		AccountComponent,
		SettingComponent,
		SharedSidenavComponent,
		SharedFooterComponent,
		SharedHomeComponent,
		OrderComponent,
		CustomerComponent,
		AttendanceComponent,
		CustomerDialogComponent,
		AccountDialogComponent,
		ServiceComponent,
		ServiceTypeDialogComponent,
		ServiceDialogComponent,
  OrderDialogComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		ServiceWorkerModule.register('ngsw-worker.js', {
			enabled: environment.production,
			// Register the ServiceWorker as soon as the app is stable
			// or after 30 seconds (whichever comes first).
			registrationStrategy: 'registerWhenStable:30000'
		}),

		BrowserAnimationsModule,
		ToastrModule.forRoot(),
		materialModules
	],
	providers: [
		{
			provide: HTTP_INTERCEPTORS,
			useClass: AuthInterceptor,
			multi: true,
		}
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
