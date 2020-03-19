import {Component, OnInit, ViewChild} from '@angular/core';
import {RequestsService} from '../../../Service/requests.service';
import {Requests} from '../../../Models/requests';
import {IonInfiniteScroll} from '@ionic/angular';

@Component({
    selector: 'app-requests',
    templateUrl: './requests.page.html',
    styleUrls: ['./requests.page.scss'],
})

export class RequestsPage implements OnInit {
    @ViewChild(IonInfiniteScroll, {static: true}) infiniteScroll: IonInfiniteScroll;

    // requestsData: any = [];
    result: any;
    requestsData: Requests[];
    requestsSearch: any;
    dataNotFound: boolean;
    page: number;
    perPage = 0;
    totalData: number;
    totalPage: number;
    private errorMessage: any;


    constructor(
        private requestService: RequestsService,
    ) {
    }

    ngOnInit() {
        this.loadRequests();
    }

    loadRequests() {
        this.requestService.getRequest().subscribe(
            res => {
                this.result = res;
                this.requestsData = this.result.data;
                this.perPage = this.result.per_page;
                this.page = this.result.current_page;
                this.totalData = this.result.total;
                this.totalPage = this.result.total_pages;
                this.requestsData = this.result.data;
                // console.log(this.requestsData);
            },
            err => {
                console.log(err);
            });
    }


    searchRequests() {
        this.requestService.searchPlaces(this.requestsSearch).subscribe(
            resp => {
                if (resp.count > 0) {
                    this.requestsData = resp.results;
                    this.dataNotFound = false;
                } else {
                    this.requestsData = [];
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
        // this.search_place = '';
        // this.loadPlaces();
        // this.data_not_found = false;
    }


    loadData(event) {
        this.page = this.page + 1;
        setTimeout(() => {
            this.requestService.getRequest(this.page)
                .subscribe(
                    res => {
                        this.result = res;
                        // this.requestsData = this.result.data;
                        this.perPage = this.result.per_page;
                        this.totalData = this.result.total;
                        this.totalPage = this.result.total_pages;
                        let Rlength = this.result.data.length;
                        for (let i = 0; i < Rlength; i++) {
                            this.requestsData.push(this.result.data[i]);
                        }
                    }),
                event.target.complete();
        }, 1000);

    }

    toggleInfiniteScroll() {
        this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
    }
}
