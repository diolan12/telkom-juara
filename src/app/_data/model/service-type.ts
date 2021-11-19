import { Validators } from "@angular/forms";

export interface ServiceType {
    id: number;
    name: string;
}

export class ServiceTypeDao {
    public static postValidator = {
        name: ['', [Validators.required, Validators.maxLength(16)]]
    }
    public static putValidator(data: ServiceType) {
        return {
            name: [data.name, [Validators.required, Validators.maxLength(16)]]
        }
    }
}

export interface ServiceTypeDao {
    name: string;
}