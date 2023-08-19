export interface IService  {
    _id: string;
    service: {
        _id: string;
        name: string;
    }
    price: number;
    duration: number
}

export interface IAllService {
    _id?: string;
    name: string;
    description: string;
    order?: number;
    barber?: string;
}