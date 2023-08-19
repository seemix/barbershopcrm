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

export interface IAdminBarberService {
    _id: string;
    service: {
        _id: string;
        name: string;
    };
    additionals: [
        {
            _id: string;
            additional: {
                _id: string;
                name: string;
                order: number
            }

        }
    ];
    price: number;
    duration: number;
    services: [{
        _id: string;
        name: string;
        price: string;
        duration: string;

    }];

}