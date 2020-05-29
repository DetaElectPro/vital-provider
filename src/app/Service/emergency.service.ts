import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {timeout} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class EmergencyService {
    Url = 'https://api.vital-helth.com/api/';

    constructor(
        private http: HttpClient,
    ) {
    }

    /**
     * Show my History new-request
     */
    public addEmergency(data): Observable<any> {
        return this.http.post(`${this.Url}emergency_serviced`, data).pipe(
            timeout(40000)
        );
    }

    /**
     * Return list of History as observable
     */
    public adminEmergencyHistory(page = 0): Observable<any> {
        return this.http.get(`${this.Url}emergency_serviced_admin_history?page=${page}`).pipe(
            timeout(40000)
        );
    }


    public ambulanceRequest(data) {
        return this.http.post(`${this.Url}ambulances`, data);
    }

    public search(search): Observable<any> {
        return this.http.get(`${this.Url}emergency_serviced_search/${search}`).pipe(
            timeout(40000)
        );
    }

    public getRequestById(id): Observable<any> {
        return this.http.get(`${this.Url}emergency_serviced/${id}`).pipe(
            timeout(40000)
        );
    }

    public userRequestEmergency(id, data): Observable<any> {
        return this.http.post(`${this.Url}emergency_serviced_user_emergency/${id}`, data).pipe(
            timeout(40000)
        );
    }

    public userCancleRequestEmergency(id): Observable<any> {
        return this.http.get(`${this.Url}emergency_serviced_emergency/${id}`).pipe(
            timeout(40000)
        );
    }

    /**
     * Return list of History as observable
     */
    public getEmergency(page = 0): Observable<any> {
        return this.http.get(`${this.Url}emergency_serviced?page=${page}`).pipe(
            timeout(40000)
        );
    }


    // Pharmacy


    public getPharmcyRequest(page = 0): Observable<any> {
        return this.http.get(`${this.Url}pharmacies?page=${page}`).pipe(
            timeout(40000)
        );
    }

    public getPharmcyHistory(page = 0): Observable<any> {
        return this.http.get(`${this.Url}pharmacy_by_user?page=${page}`).pipe(
            timeout(40000)
        );
    }

    public getPharmcyHistoryAccept(page = 0): Observable<any> {
        return this.http.get(`${this.Url}pharmacy_by_pharmacy?page=${page}`).pipe(
            timeout(40000)
        );
    }

    public getPharmcyRequestbyID(id): Observable<any> {
        return this.http.get(`${this.Url}pharmacies/${id}`).pipe(
            timeout(40000)
        );
    }

    sendPharmcyRequest(data): Observable<any> {
        return this.http.post(`${this.Url}pharmacies`, data).pipe(
            timeout(40000)
        );
    }

    updatePharmcyRequest(id, data): Observable<any> {
        console.log(data);
        return this.http.put(`${this.Url}pharmacies/${id}`, data).pipe(
            timeout(40000)
        );
    }
}
