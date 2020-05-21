import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {EmergencyService} from '../../../Service/emergency.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {
  historyData: any;
  page: number;
  perPage = 0;
  totalData: number;
  totalPage: number;
  private errorMessage: any;
  private result: any;

  constructor(
      private router: Router,
      private historyServ: EmergencyService) {
  }

  ngOnInit() {
    this.requestData();
  }

  doRefresh(event) {
    this.requestData();

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  requestData() {
    this.historyServ.adminEmergencyHistory()
        .subscribe(res => {
              this.result = res;
              this.perPage = this.result.per_page;
              this.page = this.result.current_page;
              this.totalData = this.result.total;
              this.totalPage = this.result.total_pages;
              this.historyData = this.result.data.data;

            },
            error =>
                console.log('server: ', this.errorMessage = error)
        );
  }


  loadData(event) {
    this.page = this.page + 1;
    setTimeout(() => {
      this.historyServ.adminEmergencyHistory(this.page)
          .subscribe(
              res => {
                this.result = res;
                // this.historyData = this.result.data;
                this.perPage = this.result.per_page;
                this.totalData = this.result.total;
                this.totalPage = this.result.total_pages;
                const length = this.result.data.length;
                for (let i = 0; i < length; i++) {
                  this.historyData.push(this.result.data[i]);
                }
              }),
          event.target.complete();
    }, 1000);

  }

}
