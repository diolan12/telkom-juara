// JSON web token model
export interface JWT {
    iss: string
    sub: string
    aud: string
    iat: string
    jti: string
    name: string
    gender: string
    picture: string
    email: string
    phone_number: string
    admin: number
}
