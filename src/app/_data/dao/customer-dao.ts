import { Validators } from "@angular/forms";
import { Customer } from "../model/customer";

// class CustomerPostDao with a static validator
export class CustomerDao {
    // static customer validator
    public static postValidator = {
        no_indihome: ['', Validators.maxLength(16)],
        no_telephone: ['', Validators.maxLength(16)],
        email: ['', Validators.email],
        name: ['', Validators.required, Validators.maxLength(32)],
        gender: ['', Validators.required],
        phone: ['', Validators.required, , Validators.maxLength(16)],
        whatsapp: ['', Validators.maxLength(16)],
        address: ['', Validators.required, Validators.maxLength(256)],
    }
    public static putValidator(data: Customer) {
        return {
            no_indihome: [data.no_indihome, [Validators.maxLength(16)]],
            no_telephone: [data.no_telephone, [Validators.maxLength(16)]],
            email: [data.email, [Validators.email]],
            name: [data.name, [Validators.required, Validators.maxLength(32)]],
            gender: [data.gender, [Validators.required]],
            phone: [data.phone, [Validators.required, , Validators.maxLength(16)]],
            whatsapp: [data.whatsapp, [Validators.maxLength(16)]],
            address: [data.address, [Validators.required, Validators.maxLength(256)]]
        }
    }
}

// interface for customer method POST DAO
export interface CustomerDao {
    no_indihome: string | null
    no_telephone: string | null
    email: string
    name: string
    gender: string
    phone: string
    whatsapp: string | null
    address: string
}
