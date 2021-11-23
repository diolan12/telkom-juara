import { Validators } from "@angular/forms"
import { ServiceType } from "./service-type"

export interface Service {
    id: number;
    type: ServiceType;
    name: string;
}


export class ServiceDto {
    public static postValidator = {
        type: [null, [Validators.required]],
        name: ['', [Validators.required, Validators.maxLength(32)]]
    }
    public static putValidator(data: Service) {
        return {
            type: [data.type.id, [Validators.required]],
            name: [data.name, [Validators.required, Validators.maxLength(32)]]
        }
    }
}
export interface ServiceDto {
    type: number;
    name: string;
}