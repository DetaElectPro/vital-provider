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
                console.log('res: ', this.response = response);
                if (this.response.status === true) {
                } else {
                    alert('filed');
                }
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
