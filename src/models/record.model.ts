export interface IRecord {
    barber: {
        name: string | null;
    },
    customer: {
        name: string | null;
    }
    service: {
        name: string | null;
    },
    additional: [{
        name: string | null;
    }]
    startTime: string | null;
}