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
   * Show my History request
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
}
