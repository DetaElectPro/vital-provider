import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {Platform} from '@ionic/angular';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Storage} from '@ionic/storage';
import {catchError, tap} from 'rxjs/operators';

const TOKEN_KEY = 'token';

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    token: any;
    user: any;
    url = 'https://api.vital-helth.com/api/';
    // url = 'http://localhost:8000/api/';
    // url = 'http://192.168.2.6:8000/api/';


    authenticationState = new BehaviorSubject(false);

    constructor(
        private storage: Storage,
        private plt: Platform,
        private http: HttpClient
    ) {
        this.plt.ready().then(() => {
            this.checkToken();
        });
    }

    checkToken() {
        return new Promise((resolve, reject) => {
            this.storage.get(TOKEN_KEY)
                .then(res => {
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


    // checkToken() {
    //     const token = localStorage.getItem('token');
    //     if (token) {
    //         return this.authenticationState.next(true);
    //     } else {
    //         return this.authenticationState.next(false);
    //     }
    //
    // }

    logout() {
        this.http.post(`${this.url}logout`, localStorage.getItem('token'));
        return this.storage.remove('userInfo').then(res => {
            console.log('logOut: ', res);
            localStorage.removeItem('token');
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
        return new Promise((resolve, reject) => {
            this.http.post(this.url + 'auth/login', userData, {
                headers: new HttpHeaders().set('Content-Type', 'application/json'),
            })
                .subscribe(res => {
                    this.token = res;
                    this.user = res;
                    this.token = this.token.token;
                    this.storage.set('userInfo', this.user.user);
                    this.storage.set(TOKEN_KEY, this.token).then(() => {
                        this.authenticationState.next(true);
                    });
                    resolve(res);
                }, (err) => {
                    reject(err);
                });
        });
    }

    //
    // login(data): Observable<any> {
    //     return this.http.post<any>(this.url + 'auth/login', data, {
    //         headers: new HttpHeaders().set('Content-Type', 'application/json')
    //     })
    //         .pipe(
    //             tap(_ => this.log('login')),
    //             catchError(this.handleError('login', []))
    //         );
    // }

    registerServes(userData) {
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


    medicalBoardService(boardData): Observable<any> {
        return this.http.post<any>(this.url + 'employs', boardData)
            .pipe(
                tap(_ => this.log('fetched MedicalBord')),
                catchError(this.handleError('postMedicalBord', []))
            );
    }

    // medicalBoardService(boardData) {
    //     return new Promise((resolve, reject) => {
    //         this.http.post(this.url + 'employs', boardData)
    //             .subscribe(res => {
    //                 resolve(res);
    //             }, (err) => {
    //                 reject(err);
    //             });
    //     });
    // }

    /**
     * Return list of Requests as observable
     */
    public medicalFiledService(): Observable<any> {
        return this.http.get(this.url + 'medical_specialties');
    }

    public medicalSpecialtiesService(id): Observable<any> {
        return this.http.get(`${this.url}medical_specialties/${id}`);
    }

    public checkUserService(): Observable<any> {
        return this.http.get(`${this.url}auth/check_user`);
    }

    public updateFcmToken(data): Observable<any> {
        return this.http.put(`${this.url}auth/check_user`, data);
    }

    public getSlide(): Observable<any> {
        return this.http.get(`${this.url}home`);
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // TODO: better job of transforming error for user consumption
            this.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }

    /** Log a HeroService message with the MessageService */
    private log(message: string) {
        console.log(message);
    }

}
