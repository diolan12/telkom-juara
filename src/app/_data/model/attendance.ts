import { Account } from "./account";

export interface Attendance {
    id: number;
    account: Account;
    created_at: Date;
    updated_at: Date;
}