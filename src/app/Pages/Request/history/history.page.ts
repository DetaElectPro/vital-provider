import {Component, OnInit} from '@angular/core';
import {RequestsService} from '../../../Service/requests.service';
import {History} from '../../../Models/history';
import {Router} from '@angular/router';

@Component({
    selector: 'app-history',
    templateUrl: './history.page.html',
    styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {

    // resultData: any;
    historyData: History;
    errorHand: any;

    constructor(
        private router: Router,
        private historyServ: RequestsService
    ) {
        this.loadData();

    }

    ngOnInit() {
    }

    loadData() {
        this.historyServ.requestSpecialistsHistory()
            .subscribe(res => {
                    console.log(this.historyData = res);
                },
                error =>
                    console.log('server: ', this.errorHand = error)
            )
        ;
    }

    doRefresh(event) {
        this.loadData();

        setTimeout(() => {
            event.target.complete();
        }, 2000);
    }

    goTo() {
        this.router.navigate(['new-request']);
    }
}
