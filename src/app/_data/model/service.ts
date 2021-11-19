import { Validators } from "@angular/forms"

export interface Service {
    id: number;
    type: number;
    name: string;
}


export class ServiceDao {
    public static postValidator = {
        type: [null, [Validators.required]],
        name: ['', [Validators.required, Validators.maxLength(32)]]
    }
    public static putValidator(data: Service) {
        return {
            type: [data.type, [Validators.required]],
            name: [data.name, [Validators.required, Validators.maxLength(32)]]
        }
    }
}
export interface ServiceDao {
    type: number;
    name: string;
}