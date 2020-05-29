import {Injectable} from '@angular/core';
import {HttpBackend, HttpClient} from '@angular/common/http';
import {timeout} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class FileUploadeService {
    Url = 'https://api.vital-helth.com/api/';

    private httpClient: HttpClient;

    constructor(handler: HttpBackend) {
        this.httpClient = new HttpClient(handler);
    }

    registerServes(data) {
        return this.httpClient.post<any>(`${this.Url}auth/register`, data).pipe(
            timeout(20)
        );
    }

    uploadFormData(data) {
        console.log(data);
        return this.httpClient.post<any>(`${this.Url}upload_image`, data).pipe(
            timeout(20)
        );
    }

    uploadCvFile(data) {
        return this.httpClient.post<any>(`${this.Url}upload_cv`, data).pipe(
            timeout(20)
        );
    }


}
