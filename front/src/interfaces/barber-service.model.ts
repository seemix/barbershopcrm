interface IService {
    _id: string;
    name: string;
    price: string | number;
    duration: string | number;
}

export interface IBarberService {

    services: IService[];
    barber: {
        _id: string;
        name: string
    };
}