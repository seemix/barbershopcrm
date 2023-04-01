export interface IBarberService {
    price: string | null;
    duration: number | string | null;
    service: {
        name: string;
        _id: string;
    },
    barber: {
        _id: string;
        name: string
    }
}