import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class WalletService {

    // Url = 'http://localhost:8000/api/';
    // Url = 'http://192.168.2.6:8000/api/';
    Url = 'https://api.vital-helth.com/api/';

    constructor(
        private http: HttpClient
    ) {
    }

    /**
     * Return my Point as observable
     */
    public getBalanceService(): Observable<any> {
        return this.http.get(`${this.Url}wallets`);
    }

}
