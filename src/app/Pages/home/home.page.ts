import {Component, OnInit, ViewChild} from '@angular/core';
import {Storage} from '@ionic/storage';
import {InAppBrowser} from '@ionic-native/in-app-browser/ngx';

@Component({
    selector: 'app-tab1',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {
    @ViewChild('slide', {static: false}) slide3: any;

    userInfo: any;

    constructor(
        private storage: Storage,
        private iab: InAppBrowser
    ) {
        // this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
    }

    ngOnInit(): void {
        this.storage.get('userInfo')
            .then(res => {
                this.userInfo = res;
            })
            .catch(err => {
                console.log(err);
            });
    }

    openBrow() {
        const browser = this.iab.create('http://192.168.2.3:8000/profile/' + this.userInfo.id);
        // browser.executeScript('...');
        // browser.insertCSS(...);
        // browser.on('loadstop').subscribe(event => {
        //     browser.insertCSS({code: 'body{color: red;'});
        // });

        browser.on('loadstop').subscribe(event => {
                console.log('sus: ', event);
            },
            error => {
                console.log('error: ', error);
            });
    }

    // getdachbordData() {
    //     this.data = [requests => {
    //         title:'Requests'
    //     }, '', '', 'Wallet', ''],
    // }


    slide_next() {
        this.slide3.slideNext();
    }

    slide_prev() {
        this.slide3.slidePrev();
    }
}
