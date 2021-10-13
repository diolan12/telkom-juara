export interface Account {
    id: number
    nik: string
    email: string
    name: string
    gender: string
    phone: string
    whatsapp: string
    photo: string
    role: number
}

// export interface ProcessedAccount {
//     id: number
//     nik: string;
//     name: string;
//     phone: string;
//     whatsapp: string;
//     role: string
// }

// export function processAccount(account: Account): ProcessedAccount {
//     let role = ''
//     switch (account.role) {
//         case 0: role = 'Administrator'
//             break
//         case 1: role = 'Petugas Kantor'
//             break
//         case 2: role = 'Petugas Lapangan'
//             break
//     }
//     return {
//         id: account.id,
//         nik: account.nik,
//         name: account.name,
//         role: role,
//         phone: account.phone,
//         whatsapp: account.whatsapp
//     }
// }