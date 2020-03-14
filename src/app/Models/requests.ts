export class Requests {
    id: number;
    name: string;
    address: string;
    price: number;
    // tslint:disable-next-line:variable-name
    start_time: string;
    // tslint:disable-next-line:variable-name
    end_time: string;
    // tslint:disable-next-line:variable-name
    number_of_hour: string;
    status: number;
    // tslint:disable-next-line:variable-name
    created_at: string;
    specialties: {
        id: number;
        name: string;
        medical: {
            id: number;
            name: string;
        }
    };

    user: {
        id: number;
        name: string;
        phone: string;
        email: null;
        image: string;
        active: number;
        status: number;
    };
}
