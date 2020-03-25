import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class WalletService {

    // Url = 'http://localhost:8000/api/';
    // Url = 'http://192.168.2.6:8000/api/';
    Url = 'https://medical.detatech.xyz/api/';

    myHeaders: any;
    token = `Bearer ${localStorage.getItem('token')}`;

    constructor(
        private http: HttpClient
    ) {
        this.myHeaders = {
            headers: new HttpHeaders()
                .set('Content-Type', 'application/json')
                .set('Authorization', this.token)
        };
    }

    /**
     * Return my Point as observable
     */
    public getBalanceService(): Observable<any> {
        return this.http.get(`${this.Url}my_wallets`, this.myHeaders);
    }

}
