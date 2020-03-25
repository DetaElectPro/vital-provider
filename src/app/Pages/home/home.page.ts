import {Component, OnInit, ViewChild} from '@angular/core';
import {InAppBrowser} from '@ionic-native/in-app-browser/ngx';
import {AuthService} from '../../Service/auth.service';

@Component({
    selector: 'app-tab1',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {
    @ViewChild('slide', {static: false}) slide3: any;

    response: any;

    constructor(
        private iab: InAppBrowser,
        private userServ: AuthService
    ) {
        this.getDashboardData();
    }

    ngOnInit() {

    }

    ionViewDidEnter() {
        if (localStorage.getItem('fcm_registration_in')) {
            this.updateFcmToken();
        }
    }

    openCvUpdate() {
        const browser = this.iab.create('https://medical.detatech.xyz/profile/' + this.response.user.id);
        browser.on('loadstop').subscribe(event => {
                console.log('sus: ', event);
            },
            error => {
                console.log('error: ', error);
            });
    }


    getDashboardData() {
        this.userServ.checkUserService()
            .subscribe(response => {
                this.response = response;
                if (this.response.status === true) {
                } else {
                    alert('filed');
                }
            }, error => {
                console.log('server: ', error);
            });
    }

    updateFcmToken() {
        const data = {
            fcm_registration_in: localStorage.getItem('fcm_registration_in')
        };
        this.userServ.updateFcmToken(data)
            .subscribe(response => {
                console.log('res: ', response);
                // if (this.response.status === true) {
                // } else {
                //     alert('filed');
                // }
            }, error => {
                console.log('server: ', error);
            });
    }


    slide_next() {
        this.slide3.slideNext();
    }

    slide_prev() {
        this.slide3.slidePrev();
    }
}
