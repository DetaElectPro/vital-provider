import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private token: any;
  private myHeaders: any;
  Url = 'https://api.vital-helth.com/api/';

  constructor(
      private storage: Storage,
      private http: HttpClient,
  ) {
    this.storage.get('auth-token')
        .then(res => {
          this.token = res;
        });
    this.myHeaders = {
      headers: new HttpHeaders()
          .set('Content-Type', 'application/json')
          .set('Authorization', `Bearer ${this.token}`)
    };
  }
}
