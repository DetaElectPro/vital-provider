import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AmbulanceService {
  Url = 'https://api.vital-helth.com/api/';
  token = `Bearer ${localStorage.getItem('token')}`;
  myHeaders: any;

  constructor(
      private http: HttpClient,
  ) {
    this.myHeaders = {
      headers: new HttpHeaders()
          .set('Content-Type', 'application/json')
          .set('Authorization', this.token)
    };
  }

  public ambulanceRequestService(data) {
    return this.http.post(`${this.Url}ambulances`, data);
  }

  public getAmbulanceService(page): Observable<any> {
    return this.http.get(`${this.Url}ambulances?page=${page}`);
  }

  public getAmbulanceByIdService(id): Observable<any> {
    return this.http.get(`${this.Url}ambulances/${id}`);
  }

  public cancelRequestByUser(id): Observable<any> {
    return this.http.delete(`${this.Url}ambulances/${id}`);
  }
}
