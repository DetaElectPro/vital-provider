import {Component, OnInit} from '@angular/core';
import {NavigationExtras, Router} from '@angular/router';
import {AmbulanceService} from '../../../Service/ambulance.service';

@Component({
    selector: 'app-ambulance-history',
    templateUrl: './ambulance-history.page.html',
    styleUrls: ['./ambulance-history.page.scss'],
})
export class AmbulanceHistoryPage implements OnInit {

    historyData: any;
    errorHand: any;
    page: number;
    perPage = 0;
    totalData: number;
    totalPage: number;
    private result: any;


    constructor(private historyServ: AmbulanceService, public route: Router) {
    }

    ngOnInit() {
        this.getHistory();

    }

    getHistory() {
        this.historyServ.getAmbulanceService(1)
            .subscribe(res => {
                    this.result = res;
                    this.perPage = this.result.per_page;
                    this.page = this.result.current_page;
                    this.totalData = this.result.total;
                    this.totalPage = this.result.total_pages;
                    console.log('data: ', this.historyData = this.result.data);
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
            this.historyServ.getAmbulanceService(this.page)
                .subscribe(
                    res => {
                        this.result = res;
                        // this.requestsData = this.result.data;
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


    openDetails(item) {
        const navigationExtras: NavigationExtras = {
            queryParams: {
                latitude: item.latitude,
                longitude: item.longitude,
                id: item.id,
            }
        };
        this.route.navigate([`ambulance-details/${item.id}`], navigationExtras);
    }

}
