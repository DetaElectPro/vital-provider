import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {timeout} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class RequestsService {
    Url = 'https://api.vital-helth.com/api/';

    constructor(
        private http: HttpClient,
    ) {
    }


    /**
     * Return list of Requests as observable
     */
    public getRequest(page = 0): Observable<any> {
        return this.http.get(`${this.Url}request_specialists?page=${page}`).pipe(
            timeout(40000)
        );
    }

    /**
     * Return list of Requests as observable
     */
    public getRequestById(id): Observable<any> {
        return this.http.get(`${this.Url}request_specialists/${id}`).pipe(
            timeout(40000)
        );
    }

    /**
     * Return Create Requests as observable
     */
    public createRequest(data): Observable<any> {
        return this.http.post(`${this.Url}request_specialists`, data).pipe(
            timeout(40000)
        );
    }


    /**
     * Show my History new-request
     */
    public requestSpecialistsHistory(): Observable<any> {
        return this.http.get(`${this.Url}request_specialists_admin_history`).pipe(
            timeout(40000)
        );
    }


    public adminAcceptRequestSpecialists(id) {
        return this.http.get(`${this.Url}acceptRequestByAdmin/${id}`).pipe(
            timeout(40000)
        );
    }

    public cancelRequestByAdmin(id) {
        return this.http.get(`${this.Url}cancelRequestByAdmin/${id}`).pipe(
            timeout(40000)
        );
    }

    public cancelRequestByAdminToUser(id) {
        return this.http.get(`${this.Url}cancelRequestByAdminToUser/${id}`).pipe(
            timeout(40000)
        );
    }

    public acceptRequestByAdminAndDone(id, data) {
        return this.http.post(`${this.Url}acceptRequestAndDone/${id}`, data).pipe(
            timeout(40000)
        );
    }


}
