import { Validators } from "@angular/forms";

export interface OrderPhoto {
    id: number;
    order: number;
    file: string | null;
    description: string;
    created_at: string;
    updated_at: string | null;
    deleted_at: string | null;
}

export class OrderPhotoDTO {
    public static postValidator(data: OrderPhoto) {
        return {
            order: [data.order, [Validators.required]],
            description: ['', [Validators.required, Validators.maxLength(12)]]
        }
    }

    public static putValidator(data: OrderPhoto) {
        return {
            order: [data.order, [Validators.required]],
            description: [data.description, [Validators.required, Validators.maxLength(12)]]
        }
    }
}

export interface OrderPhotoDTO {
    order: number;
    description: string;
}