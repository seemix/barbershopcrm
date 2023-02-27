export interface IRecord {
    barber: {
        name: string | null;
    },
    customer: {
        name: string | null;
        email: string | null;
    }
    service: {
        name: string | null;
    },
    additional: [{
        name: string | null;
    }]
    startTime: string | null;
    price: number | null;
    status: string | null;
}