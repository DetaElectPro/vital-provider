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
    number_of_hour: number;
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
    // tslint:disable-next-line:variable-name
    accept_request: {
        id: number
        note: string
        recommendation: string
        rating: number
        doctor_id: number
        request_id: number
        doctor: {
            id: number;
            name: string;
            phone: string;
            image: string;
            active: number;
            status: number;
        };
    };
}
