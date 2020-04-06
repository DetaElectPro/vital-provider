import {Component, OnInit} from '@angular/core';
import {EmergencyService} from '../../../Service/emergency.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {
  pharmacyData: any;
  page: number;
  perPage = 0;
  totalData: number;
  totalPage: number;
  errorMessage: any;
  result: any;
  search: any;

  constructor(
      private pharmacyServ: EmergencyService
  ) {
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
    this.pharmacyServ.getPharmcyHistory()
        .subscribe(res => {
              this.result = res;
              this.perPage = this.result.per_page;
              this.page = this.result.current_page;
              this.totalData = this.result.total;
              this.totalPage = this.result.total_pages;
              this.pharmacyData = this.result.data;
            },
            error =>
                console.log('server: ', this.errorMessage = error)
        );
  }


  loadData(event) {
    this.page = this.page + 1;
    setTimeout(() => {
      this.pharmacyServ.getPharmcyHistory(this.page)
          .subscribe(
              res => {
                this.result = res;
                this.perPage = this.result.per_page;
                this.totalData = this.result.total;
                this.totalPage = this.result.total_pages;
                const length = this.result.data.length;
                for (let i = 0; i < length; i++) {
                  this.pharmacyData.push(this.result.data[i]);
                }
              }),
          event.target.complete();
    }, 1000);

  }

  searchRequests() {
    this.pharmacyServ.search(this.search).subscribe(
        resp => {
          if (resp.count > 0) {
            this.pharmacyData = resp.results;
          } else {
            this.pharmacyData = [];
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
