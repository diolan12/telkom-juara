// generic response model
export interface Response<T> {
    type: string;
    content: T;
}
