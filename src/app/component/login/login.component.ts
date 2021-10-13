import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { LoginDao } from 'src/app/_data/dao/login-dao';
import { AuthService } from 'src/app/_data/service/auth.service'

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	togglePassword = true;

	isLoading = false;

	authForm: FormGroup;

	constructor(
		private zone: NgZone,
		private toastr: ToastrService,
		private authService: AuthService,
		private router: Router,
		private formBuilder: FormBuilder
	) {
		this.authForm = this.formBuilder.group(LoginDao.validator)

	}

	ngOnInit(): void {
		if (this.authService.isLoggedIn()) {
			this.router.navigateByUrl('/dashboard');
		}
	}

	login() {
		this.isLoading = true;
		if (this.authForm.invalid) {
			this.toastr.error('NIK or password invalid', 'Login Error');
			this.isLoading = false;
			return;
		}
		this.authService.login(this.authForm.value).then(() => {
			this.toastr.success('Welcome', 'Login Success');
			this.navigate('/dashboard')
		}).catch((err) => {
			this.toastr.error(err.message, 'Login Error');
		}).finally(() => {
			this.isLoading = false;
		});
	}

	navigate(target: string) {
		this.zone.run(() => {
			this.router.navigateByUrl(target);
		})
	}

}
