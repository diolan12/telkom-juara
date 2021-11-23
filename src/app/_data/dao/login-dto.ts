import { Validators } from "@angular/forms";

export class LoginDTO {
    public static validator = {
        // delete in production 16982818
        nik: ['16982818', Validators.required],
        password: ['', Validators.required]
    }
}
export interface LoginDTO {
    nik: string;
    password: string;
}