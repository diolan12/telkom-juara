import { Validators } from "@angular/forms";

export interface OrderPhoto {
    id: number;
    order: number;
    file: string | null;
    description: string;
    created_at: Date;
    updated_at: Date | null;
    deleted_at: Date | null;
}

export class OrderPhotoDTO {
    public static postValidator(data: OrderPhoto) {
        return {
            order: [data.order, [Validators.required]],
            description: ['', [Validators.required, Validators.maxLength(32)]]
        }
    }

    public static putValidator(data: OrderPhoto) {
        return {
            order: [data.order, [Validators.required]],
            description: [data.description, [Validators.required, Validators.maxLength(32)]]
        }
    }
}

export interface OrderPhotoDTO {
    order: number;
    description: string;
}