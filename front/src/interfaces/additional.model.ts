export interface IAdditional {
    _id: string;
    barber: {
        _id: string;
        name: string;
    },
    additional: {
        _id: string;
        name: string;
    },
    price: number;
    duration: number;
}

export interface IAdd {
    _id?: string;
    name: string;
    order?: number
}