import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Router} from '@angular/router';
import {ToastController} from '@ionic/angular';
import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(private router: Router,
                public storage: Storage,
                public toastController: ToastController) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = `Bearer ${localStorage.getItem('token')}`;
        if (token) {
            request = request.clone({
                setHeaders: {
                    Authorization: token
                }
            });
        }

        if (!request.headers.has('Content-Type')) {
            request = request.clone({
                setHeaders: {
                    'content-type': 'application/json'
                }
            });
        }

        if (request.body instanceof FormData) {
            console.log('foem');
            console.log('foem');
            // contentType = ''
            request = request.clone({headers: request.headers.delete('content-type', 'multipart/form-data')});
            request = request.clone({headers: request.headers.delete('content-type', 'multipart/form-data')});
            request = request.clone({headers: request.headers.delete('accept', 'application/json')});
        }

        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    // console.log('event--->>>', event);
                }
                return event;
            }),
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401) {
                    if (error.error.success === false) {
                        this.presentToast('Login failed');
                    } else {
                        this.router.navigate(['login']);
                    }
                }
                // if (error.status === 500) {
                //     if (error.error.success === false) {
                //         this.presentToast('Login failed');
                //     } else {
                //         this.router.navigate(['login']);
                //     }
                // }
                return throwError(error);
            }));
    }


    async presentToast(msg) {
        const toast = await this.toastController.create({
            message: msg,
            duration: 2000,
            position: 'top'
        });
        toast.present();
    }
}
