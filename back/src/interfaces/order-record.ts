export interface IOrderRecord {
    _id: string | null;
    startTime: string | null;
    price: number | null;
    customer: {
        name: string;
        email: string;
    }
    barber: {
        name: string;
    }
    service: {
        name: string;
    }
    addtitional: [{
        name: string;
    }]
}