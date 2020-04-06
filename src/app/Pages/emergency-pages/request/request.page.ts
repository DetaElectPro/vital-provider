import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {EmergencyService} from '../../../Service/emergency.service';

@Component({
  selector: 'app-request',
  templateUrl: './request.page.html',
  styleUrls: ['./request.page.scss'],
})
export class RequestPage implements OnInit {

  emergencyData: any;
  page: number;
  perPage = 0;
  totalData: number;
  totalPage: number;
  private errorMessage: any;
  private result: any;
  private search: string;
  private dataNotFound: boolean;

  constructor(private router: Router,
              private emergencyServ: EmergencyService) {
  }

  ngOnInit() {
    this.requestData();
  }

  doRefresh(event) {
    this.requestData();

    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }

  requestData() {
    this.emergencyServ.getEmergency()
        .subscribe(res => {
              this.result = res;
              this.perPage = this.result.per_page;
              this.page = this.result.current_page;
              this.totalData = this.result.total;
              this.totalPage = this.result.total_pages;
              this.emergencyData = this.result.data.data;

            },
            error =>
                console.log('server: ', this.errorMessage = error)
        );
  }


  loadData(event) {
    this.page = this.page + 1;
    setTimeout(() => {
      this.emergencyServ.getEmergency(this.page)
          .subscribe(
              res => {
                this.result = res;
                // this.emergencyData = this.result.data;
                this.perPage = this.result.per_page;
                this.totalData = this.result.total;
                this.totalPage = this.result.total_pages;
                const length = this.result.data.length;
                for (let i = 0; i < length; i++) {
                  this.emergencyData.push(this.result.data[i]);
                }
              }),
          event.target.complete();
    }, 1000);

  }

  searchRequests() {
    this.emergencyServ.search(this.search).subscribe(
        resp => {
          if (resp.count > 0) {
            this.emergencyData = resp.results;
            this.dataNotFound = false;
          } else {
            this.emergencyData = [];
            this.dataNotFound = true;
          }
          console.log('Search Result', resp);
        },
        err => {
          console.log(err);
        }
    );
  }

  clearSearch() {
    this.requestData();
  }

}
