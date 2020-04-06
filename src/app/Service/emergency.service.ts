import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmergencyService {
  Url = 'https://medical.detatech.xyz/api/';
  // Url = 'http://localhost:8000/api/';
  // Url = 'http://192.168.2.6:8000/api/';
  token = `Bearer ${localStorage.getItem('token')}`;
  private myHeaders: any;

  constructor(
      private http: HttpClient,
  ) {
    this.myHeaders = {
      headers: new HttpHeaders()
          .set('Content-Type', 'application/json')
          .set('Authorization', this.token)
    };
  }

  /**
   * Show my History new-request
   */
  public addEmergency(data): Observable<any> {
    return this.http.post(`${this.Url}emergency_serviced`, data, this.myHeaders);
  }

  /**
   * Return list of History as observable
   */
  public adminEmergencyHistory(page = 0): Observable<any> {
    return this.http.get(`${this.Url}emergency_serviced_admin_history?page=${page}`, this.myHeaders);
  }


  public ambulanceRequest(data) {
    return this.http.post(`${this.Url}ambulances`, data, this.myHeaders);
  }

  public search(search): Observable<any> {
    return this.http.get(`${this.Url}emergency_serviced_search/${search}`, this.myHeaders);
  }

  public getRequestById(id): Observable<any> {
    return this.http.get(`${this.Url}emergency_serviced/${id}`, this.myHeaders);
  }

  public userRequestEmergency(id, data): Observable<any> {
    return this.http.post(`${this.Url}emergency_serviced_user_emergency/${id}`, data, this.myHeaders);
  }

  public userCancleRequestEmergency(id): Observable<any> {
    return this.http.get(`${this.Url}emergency_serviced_emergency/${id}`, this.myHeaders);
  }

  /**
   * Return list of History as observable
   */
  public getEmergency(page = 0): Observable<any> {
    return this.http.get(`${this.Url}emergency_serviced?page=${page}`, this.myHeaders);
  }


  // Pharmacy


  public getPharmcyRequest(page = 0): Observable<any> {
    return this.http.get(`${this.Url}pharmacies?page=${page}`, this.myHeaders);
  }

  public getPharmcyHistory(page = 0): Observable<any> {
    return this.http.get(`${this.Url}pharmacy_by_user?page=${page}`, this.myHeaders);
  }

  public getPharmcyHistoryAccept(page = 0): Observable<any> {
    return this.http.get(`${this.Url}pharmacy_by_pharmacy?page=${page}`, this.myHeaders);
  }

  public getPharmcyRequestbyID(id): Observable<any> {
    return this.http.get(`${this.Url}pharmacies/${id}`, this.myHeaders);
  }

  sendPharmcyRequest(data): Observable<any> {
    return this.http.post(`${this.Url}pharmacies`, data, this.myHeaders);
  }

  updatePharmcyRequest(id, data): Observable<any> {
    console.log(data);
    return this.http.patch(`${this.Url}pharmacies/${id}`, data, this.myHeaders);
  }
}
