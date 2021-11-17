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

// Component
import { NotFoundComponent } from './error/not-found/not-found.component';
import { LoginComponent } from './component/login/login.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { AdminComponent } from './component/dashboard/admin/admin.component';
import { FieldComponent } from './component/dashboard/field/field.component';
import { ProfileComponent } from './component/dashboard/profile/profile.component';
import { OfficeComponent } from './component/dashboard/office/office.component';
import { AccountComponent } from './component/dashboard/admin/account/account.component';
import { SettingComponent } from './component/dashboard/admin/setting/setting.component';
import { SharedSidenavComponent } from './component/_shared/shared-sidenav/shared-sidenav.component';
import { SharedFooterComponent } from './component/_shared/shared-footer/shared-footer.component';

// interceptor
import { AuthInterceptor } from "./_data/interceptor/auth.interceptor";
import { NewAccountDialogComponent } from './component/dashboard/admin/account/dialog/new-account-dialog/new-account-dialog.component';
import { EditAccountDialogComponent } from './component/dashboard/admin/account/dialog/edit-account-dialog/edit-account-dialog.component';
import { SharedHomeComponent } from './component/_shared/shared-home/shared-home.component';

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
	MatSelectModule
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
		NewAccountDialogComponent,
		EditAccountDialogComponent,
  SharedHomeComponent
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
