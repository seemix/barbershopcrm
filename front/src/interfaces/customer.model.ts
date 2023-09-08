export interface ISingleCustomer {
    _id: string | null;
    name: string | null;
    phone: string | null;
    email: string | null;
    tag: string | null;
}

export interface ICustomerParams {
    page: string | number | null,
    sort: string | null,
    search: string | null
}