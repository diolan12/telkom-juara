import { Validators } from "@angular/forms"

export interface Order {
    id: number;
    uid: string;
    field: number | null;
    office: number;
    status: string;
    customer: number;
    service: number;
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
            customer: [data.customer, [Validators.required]],
            service: [data.service, [Validators.required]]
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