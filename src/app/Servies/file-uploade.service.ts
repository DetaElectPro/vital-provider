import {Injectable} from '@angular/core';
import {HttpBackend, HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class FileUploadeService {
    Url = 'https://api.vital-helth.com/api/';


    // private httpClient: HttpClient;
    // private myHeaders: any;
    //
    // constructor(
    //     // handler: HttpBackend,
    //     private http: HttpClient) {
    //     // this.httpClient = new HttpClient(handler);
    //     this.myHeaders = {
    //         headers: new HttpHeaders()
    //         // .set('Content-Type', 'application/json')
    //             .set('content-type', 'multipart/form-data')
    //     };
    // }


    private httpClient: HttpClient;

    constructor(handler: HttpBackend) {
        this.httpClient = new HttpClient(handler);
    }


    uploadFormData(data) {
        console.log(data);
        return this.httpClient.post<any>(`${this.Url}upload_image`, data);
    }

    uploadCvFile(data) {
        return this.httpClient.post<any>(`${this.Url}upload_cv`, data);
    }


}
