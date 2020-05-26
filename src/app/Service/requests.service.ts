import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class RequestsService {
    Url = 'https://api.vital-helth.com/api/';
    // Url = 'http://localhost:8000/api/';
    // Url = 'http://192.168.2.6:8000/api/';

    constructor(
        private http: HttpClient,
    ) {}



    /**
     * Return list of Requests as observable
     */
    public getRequest(page = 0): Observable<any> {
        return this.http.get(`${this.Url}request_specialists?page=${page}`);
    }

    /**
     * Return list of Requests as observable
     */
    public getRequestById(id): Observable<any> {
        return this.http.get(`${this.Url}request_specialists/${id}`);
    }

    /**
     * Return Create Requests as observable
     */
    public createRequest(data): Observable<any> {
        return this.http.post(`${this.Url}request_specialists`, data);
    }


    /**
     * Search new-request by title
     */
    public searchPlaces(title: string): Observable<any> {
        console.log('Search params', title);
        return this.http.get(`${this.Url}search_request_specialists?search=${title}`);
    }

    /**
     * Show my History new-request
     */
    public requestSpecialistsHistory(): Observable<any> {
        return this.http.get(`${this.Url}request_specialists_admin_history`);
    }


    public adminAcceptRequestSpecialists(id) {
        return this.http.get(`${this.Url}acceptRequestByAdmin/${id}`);
    }

    public cancelRequestByAdmin(id) {
        return this.http.get(`${this.Url}cancelRequestByAdmin/${id}`);
    }

    public cancelRequestByAdminToUser(id) {
        return this.http.get(`${this.Url}cancelRequestByAdminToUser/${id}`);
    }

    public acceptRequestByAdminAndDone(id, data) {
        return this.http.post(`${this.Url}acceptRequestAndDone/${id}`, data);
    }


}
