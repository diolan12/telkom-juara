import { AbstractControl, UntypedFormControl, FormGroupDirective, NgForm, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";

// account model
export interface Account {
    id: number
    nik: string
    email: string
    name: string
    gender: string
    phone: string
    whatsapp: string | null
    photo: string
    role: number
}

// class AccountPostDao with static validator and static password validator
export class AccountDTO {
    // static account validator
    public static postValidator = {
        nik: ['', [Validators.required, Validators.maxLength(8)]],
        email: ['', [Validators.email]],
        name: ['', [Validators.required, Validators.maxLength(32)]],
        gender: ['', [Validators.required]],
        phone: ['', [Validators.required, Validators.maxLength(16)]],
        whatsapp: [null, [Validators.maxLength(16)]],
        password: ['', [Validators.required]],
        rePassword: ['', [Validators.required]],
        role: [null, [Validators.required]],
    }
    public static putValidator(data: Account) {
        return {
            nik: [data.nik, [Validators.required, Validators.maxLength(8)]],
            email: [data.email, [Validators.email]],
            name: [data.name, [Validators.required, Validators.maxLength(32)]],
            gender: [data.gender, [Validators.required]],
            phone: [data.phone, [Validators.required, Validators.maxLength(16)]],
            whatsapp: [data.whatsapp, [Validators.maxLength(16)]],
            // password: ['', [Validators.maxLength(32)]],
            // rePassword: ['', [this.passwordMatcher]],
            role: [data.role, [Validators.required]],
        }
    }
    // static password validator
    public static passwordMatcher: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
        let pass = group.get('password')?.value;
        let confirmPass = group.get('rePassword')?.value
        return pass === confirmPass ? null : { notSame: true }
    }
}

// interface for account POST DAO
export interface AccountDTO {
    id: number;
    nik: string;
    email: string;
    name: string;
    gender: string;
    phone: string;
    whatsapp: string | null;
    password: string;
    rePassword: string;
    role: number;
}

// a password error state matcher
export class PasswordErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: UntypedFormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const invalidCtrl = !!(control?.invalid && control?.parent?.dirty);
        const invalidParent = !!(control?.parent?.invalid && control?.parent?.dirty);

        return invalidCtrl || invalidParent;
    }
}