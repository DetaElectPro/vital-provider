import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {EmergencyService} from '../../../Service/emergency.service';
import {AlertController, LoadingController} from '@ionic/angular';

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
    private result: any;

    constructor(
        private router: Router,
        private presentAlertConfirm: AlertController,
        private loadingController: LoadingController,
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

    async requestData() {
        const loading = this.loadingController.create({
            spinner: 'bubbles',
            message: 'Please wait...',
            translucent: true,
        });
        (await loading).present();
        this.historyServ.adminEmergencyHistory()
            .subscribe(async res => {
                    this.result = res;
                    (await loading).dismiss();
                    console.log('res: ', res);
                    this.perPage = this.result.per_page;
                    this.page = this.result.current_page;
                    this.totalData = this.result.total;
                    this.totalPage = this.result.total_pages;
                    this.historyData = this.result.data.data;

                },
                async error =>
                    (await loading).dismiss()
            );
    }


    loadData(event) {
        this.page = this.page + 1;
        setTimeout(() => {
            this.historyServ.adminEmergencyHistory(this.page)
                .subscribe(
                    res => {
                        console.log('res: ', this.result = res);
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
