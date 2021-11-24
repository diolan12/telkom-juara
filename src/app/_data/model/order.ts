import { Validators } from "@angular/forms"
import { Account } from "./account"
import { Customer } from "./customer"
import { Service } from "./service"

export interface Order {
    id: number;
    uid: string;
    field: Account | null;
    office: Account;
    status: string;
    customer: Customer;
    service: Service;
    doc_customer: string | null;
    doc_customer_taken_at: string | null;
    doc_house: string | null;
    doc_house_taken_at: string | null;
}

export class OrderDTO {
    public static postValidator = {
        field: [null, []],
        office: [null, [Validators.required]],
        status: ['', [Validators.required]],
        customer: [null, [Validators.required]],
        service: [null, [Validators.required]]
    }
    public static putValidator(data: Order) {
        return {
            field: [data.field, []],
            office: [data.office, [Validators.required]],
            status: [data.status, [Validators.required]],
            customer: [data.customer.id, [Validators.required]],
            service: [data.service.id, [Validators.required]]
        }
    }
}

export interface OrderDTO {
    field: number | null;
    office: number;
    status: string;
    customer: number;
    service: number;
}