import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Storage} from '@ionic/storage';

@Injectable({
    providedIn: 'root'
})
export class RequestsService {
    // Url = 'https://medical.detatech.xyz/api/';
    // Url = 'http://localhost:8000/api/';
    Url = 'http://192.168.2.4:8000/api/';
    private myHeaders: any;
    token = `Bearer ${localStorage.getItem('token')}`;

    constructor(
        private http: HttpClient,
        private storage: Storage,
    ) {
        this.myHeaders = {
            headers: new HttpHeaders()
                .set('Content-Type', 'application/json')
                .set('Authorization', this.token)
        };
    }

    /**
     * Add page value url param
     */
    getByPage(page: number): string {
        if (page) {
            return '&page=' + page;
        } else {
            return '';
        }
    }

    /**
     * Return list of Requests as observable
     */
    public getRequest(page = 0): Observable<any> {
        // return this.http.get(`${this.Url}requestSpecialists?${this.getByPage(page)}`);
        return this.http.get(`${this.Url}request_specialists?page=${page}`, this.myHeaders);
    }

    /**
     * Return list of Requests as observable
     */
    public getRequestById(id): Observable<any> {
        return this.http.get(`${this.Url}request_specialists/${id}`, this.myHeaders);
    }


    /**
     * Search request by title
     */
    public searchPlaces(title: string): Observable<any> {
        console.log('Search params', title);
        return this.http.get(`${this.Url}search_request_specialists?search=${title}`, this.myHeaders);
    }

    /**
     * Show my History request
     */
    public requestSpecialistsHistory(): Observable<any> {
        return this.http.get(`${this.Url}request_specialists_doctor_history`, this.myHeaders);
    }

    public userAcceptRequestSpecialists(id) {
        return this.http.get(`${this.Url}acceptRequestByUser/${id}`, this.myHeaders);
    }

    public cancelRequestByUser(id) {
        return this.http.get(`${this.Url}cancelRequestByUser/${id}`, this.myHeaders);
    }

    public ambulanceRequest(data) {
        return this.http.post(`${this.Url}cancelRequestByUser`, data, this.myHeaders);
    }

}
