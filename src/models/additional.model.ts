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