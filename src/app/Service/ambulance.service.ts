import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {timeout} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class AmbulanceService {
    Url = 'https://api.vital-helth.com/api/';

    constructor(
        private http: HttpClient,
    ) {
    }

    public ambulanceRequestService(data) {
        return this.http.post(`${this.Url}ambulances`, data).pipe(
            timeout(40000)
        );
    }

    public getAmbulanceService(page): Observable<any> {
        return this.http.get(`${this.Url}ambulances?page=${page}`).pipe(
            timeout(40000)
        );
    }

    public getAmbulanceByIdService(id): Observable<any> {
        return this.http.get(`${this.Url}ambulances/${id}`).pipe(
            timeout(40000)
        );
    }

    public cancelRequestByUser(id): Observable<any> {
        return this.http.delete(`${this.Url}ambulances/${id}`).pipe(
            timeout(40000)
        );
    }
}
