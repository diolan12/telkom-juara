export interface AccountPostDao {
    nik: string;
    email: string;
    name: string;
    gender: string;
    phone: string;
    whatsapp: string;
    password: string;
    role: number;
}
export interface AccountPutDao {
    nik: string;
    email: string;
    name: string;
    gender: string;
    phone: string;
    whatsapp: string | null;
    photo: string | null;
    password: string;
    role: number;
}