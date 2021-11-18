import { Validators } from "@angular/forms";
import { Customer } from "../model/customer";

// class CustomerPostDao with a static validator
export class CustomerPostDao {
    // static customer validator
    public static validator = {
        email: ['', Validators.email],
        name: ['', Validators.required],
        gender: ['', Validators.required],
        phone: ['', Validators.required],
        whatsapp: ['', Validators.required],
        address: ['', Validators.required],
    }
}

// interface for customer method POST DAO
export interface CustomerPostDao {
    id: number
    no_indihome: string
    no_telephone: string | null
    email: string
    name: string
    gender: string
    phone: string
    whatsapp: string
    address: string
}

export class CustomerPutDao {
    public static validator(data: Customer) {
        return {
            email: [data.email, Validators.email],
            name: [data.name, Validators.required],
            gender: [data.gender, Validators.required],
            phone: [data.phone, Validators.required],
            whatsapp: [data.whatsapp, Validators.required],
            address: [data.address, Validators.required],
        }
    }
}

// interface for customer method PUT DAO
export interface CustomerPutDao {
    no_indihome: string
    no_telephone: string | null
    email: string
    name: string
    gender: string
    phone: string
    whatsapp: string
    address: string
}
