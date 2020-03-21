import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Platform} from '@ionic/angular';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Storage} from '@ionic/storage';

const TOKEN_KEY = 'token';

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    token: any;
    user: any;
    // url = 'https://medical.detatech.xyz/api/';
    // url = 'http://localhost:8000/api/';
    url = 'http://192.168.2.7:8000/api/';


    authenticationState = new BehaviorSubject(false);
    private myHeaders: any;
    token2 = `Bearer ${localStorage.getItem('token')}`;

    constructor(
        private storage: Storage,
        private plt: Platform,
        private http: HttpClient
    ) {
        this.plt.ready().then(() => {
            this.checkToken();
        });
        this.myHeaders = {
            headers: new HttpHeaders()
                .set('Content-Type', 'application/json')
                .set('Authorization', this.token2)
        };
    }

    checkToken() {
        return new Promise((resolve, reject) => {
            this.storage.get(TOKEN_KEY)
                .then(res => {
                    console.log('res: ', res);
                    if (res) {
                        this.authenticationState.next(true);
                    } else {
                        this.authenticationState.next(false);
                    }

                    resolve(res);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    logout() {
        this.storage.remove('userInfo');
        return this.storage.remove(TOKEN_KEY).then(() => {
            this.authenticationState.next(false);
        });
    }


    isAuthenticated() {
        return new Promise((resolve, reject) => {
            this.checkToken()
                .then(res => {
                    resolve(this.authenticationState.value);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }


    loginServes(userData) {
        console.log(userData);
        return new Promise((resolve, reject) => {
            this.http.post(this.url + 'auth/login', JSON.stringify(userData), {
                headers: new HttpHeaders().set('Content-Type', 'application/json'),
            })
                .subscribe(res => {
                    this.token = res;
                    this.user = res;
                    this.token = this.token.token;
                    console.log('token', this.token);
                    this.storage.set(TOKEN_KEY, this.token).then(() => {
                        this.authenticationState.next(true);
                    });
                    this.storage.set('userInfo', this.user.user).then(r =>
                        console.log('login:', r));
                    resolve(res);
                }, (err) => {
                    reject(err);
                });
        });
    }

    registerServes(userData) {
        console.log(userData);
        return new Promise((resolve, reject) => {
            this.http.post(this.url + 'auth/register', JSON.stringify(userData), {
                headers: new HttpHeaders().set('Content-Type', 'application/json'),
            })
                .subscribe(res => {
                    resolve(res);
                }, (err) => {
                    reject(err);
                });
        });
    }

    medicalBoardService(boardData) {
        console.log(boardData);
        return new Promise((resolve, reject) => {
            this.http.post(this.url + 'employs', boardData, {
                headers: new HttpHeaders().set('Content-Type', 'application/json')
                    .set('Authorization', this.token2),
            })
                .subscribe(res => {
                    resolve(res);
                }, (err) => {
                    reject(err);
                });
        });
    }

    /**
     * Return list of Requests as observable
     */
    public medicalFiledService(): Observable<any> {
        return this.http.get(this.url + 'medical_specialties');
        // return this.http.get(this.url + 'medical_fields');
    }


    public medicalSpecialtiesService(id): Observable<any> {
        return this.http.get(`${this.url}medical_specialties/${id}`);
    }

}
