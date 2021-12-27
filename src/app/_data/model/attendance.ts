import { Validators } from "@angular/forms";
import { Account } from "./account";

export interface Attendance {
    id: number;
    account: Account;
    created_at: string;
}

export class AttendanceDTO {
    public static postValidator = {
        account: [0, [Validators.required]],
    }
}

export interface AttendanceDTO {
    account: number;
}