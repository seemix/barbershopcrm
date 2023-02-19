export interface IService  {
    _id: string;
    service: {
        _id: string;
        name: string;
    }
    price: number;
    duration: number
}