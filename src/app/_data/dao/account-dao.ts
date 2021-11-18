import { AbstractControl, FormControl, FormGroupDirective, NgForm, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";
import { Account } from "../model/account";

// class AccountPostDao with static validator and static password validator
export class AccountPostDao {
    // static account validator
    public static validator = {
        nik: ['', Validators.required],
        email: ['', Validators.email],
        name: ['', Validators.required],
        gender: ['', Validators.required],
        phone: ['', Validators.required],
        whatsapp: ['', Validators.required],
        password: ['', Validators.required],
        rePassword: ['', Validators.required],
        role: [null, Validators.required],
    }
    // static password validator
    public static passwordMatcher: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
        let pass = group.get('password')?.value;
        let confirmPass = group.get('rePassword')?.value
        return pass === confirmPass ? null : { notSame: true }
    }
}

// interface for account POST DAO
export interface AccountPostDao {
    id: number;
    nik: string;
    email: string;
    name: string;
    gender: string;
    phone: string;
    whatsapp: string;
    password: string;
    role: number;
}

export class AccountPutDao {
    public static validator(data: Account) {
        return {
            nik: [data.nik, Validators.required],
            email: [data.email, Validators.email],
            name: [data.name, Validators.required],
            gender: [data.gender, Validators.required],
            phone: [data.phone, Validators.required],
            whatsapp: [data.whatsapp],
            password: ['', Validators.required],
            rePassword: ['', Validators.required],
            role: [data.role, Validators.required],
        }
    }
    public static passwordMatcher: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
        let pass = group.get('password')?.value;
        let confirmPass = group.get('rePassword')?.value
        return pass === confirmPass ? null : { notSame: true }
    }
}

// interface for account PUT DAO
export interface AccountPutDao {
    nik: string;
    email: string;
    name: string;
    gender: string;
    phone: string;
    whatsapp: string | null;
    photo: string | null;
    password: string;
    rePassword: string;
    role: number;
}

// a password error state matcher
export class PasswordErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const invalidCtrl = !!(control?.invalid && control?.parent?.dirty);
        const invalidParent = !!(control?.parent?.invalid && control?.parent?.dirty);

        return invalidCtrl || invalidParent;
    }
}