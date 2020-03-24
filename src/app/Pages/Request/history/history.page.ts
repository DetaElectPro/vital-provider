import {Component, OnInit} from '@angular/core';
import {RequestsService} from '../../../Service/requests.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-history',
    templateUrl: './history.page.html',
    styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {

    // resultData: any;
    historyData: any;
    errorHand: any;
    page: number;
    perPage = 0;
    totalData: number;
    totalPage: number;
    private result: any;

    constructor(
        private router: Router,
        private historyServ: RequestsService
    ) {

    }

    ngOnInit() {
        this.getHistory();

    }

    getHistory() {
        this.historyServ.requestSpecialistsHistory()
            .subscribe(res => {
                    this.result = res;
                    this.perPage = this.result.per_page;
                    this.page = this.result.current_page;
                    this.totalData = this.result.total;
                    this.totalPage = this.result.total_pages;
                    this.historyData = this.result.data;
                },
                error =>
                    console.log('server: ', this.errorHand = error)
            )
        ;
    }

    doRefresh(event) {
        this.getHistory();

        setTimeout(() => {
            event.target.complete();
        }, 2000);
    }


    loadData(event) {
        this.page = this.page + 1;
        setTimeout(() => {
            this.historyServ.getRequest(this.page)
                .subscribe(
                    res => {
                        this.result = res;
                        // this.requestsData = this.result.data;
                        this.perPage = this.result.per_page;
                        this.totalData = this.result.total;
                        this.totalPage = this.result.total_pages;
                        let Rlength = this.result.data.length;
                        for (let i = 0; i < Rlength; i++) {
                            this.historyData.push(this.result.data[i]);
                        }
                    }),
                event.target.complete();
        }, 1000);

    }


    goTo() {
        this.router.navigate(['new-request']);
    }
}
