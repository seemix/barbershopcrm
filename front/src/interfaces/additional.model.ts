export interface IAdditional {
    _id: string;
    barber?: {
        _id: string;
        name: string;
    },
    name: string;
    price: number;
    duration: number;
}

export interface IAdd {
    _id?: string;
    name: string;
    order?: number,
    barberId?: string
}

export interface IBarberAdditional {
    _id?: string;
    barber: string;
    price?: number;
    duration?: number;
    additional: {
        _id: string;
        name: string;
    };
}