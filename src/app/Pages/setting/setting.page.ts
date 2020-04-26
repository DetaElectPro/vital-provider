import {Component, OnInit} from '@angular/core';
import {Storage} from '@ionic/storage';
import {AuthService} from '../../Service/auth.service';
import {Router} from '@angular/router';
import {InAppBrowser} from '@ionic-native/in-app-browser/ngx';

@Component({
    selector: 'app-tab2',
    templateUrl: 'setting.page.html',
    styleUrls: ['setting.page.scss']
})
export class SettingPage implements OnInit {
    token: any;
    userInfo: any;


    constructor(
        private storage: Storage,
        private iab: InAppBrowser,
        private authServ: AuthService,
        private route: Router) {
        this.token = this.storage.get('access_token');

    }

    async logOut() {
        await this.authServ.logout()
            .then(res => {
                console.log('logOut:', res);
                this.route.navigate(['/login']);

            })
            .catch(err => {
                alert(err);
                this.route.navigate(['/']);

            });
    }

    ngOnInit(): void {
        this.storage.get('userInfo')
            .then(res => {
                this.userInfo = res;
            })
            .catch(erro => {
                alert(erro);
            });
    }

    openPrivacyPolicy() {
        const browser = this.iab.create('https://vital-helth.com/privacy_policy');
        browser.on('loadstop').subscribe(event => {
                console.log('sus: ', event);
            },
            error => {
                console.log('error: ', error);
            });
    }

    openTermsAndConditions() {
        const browser = this.iab.create('https://vital-helth.com/terms_and_conditions');
        browser.on('loadstop').subscribe(event => {
                console.log('sus: ', event);
            },
            error => {
                console.log('error: ', error);
            });
    }

    updateImage() {
        const browser = this.iab.create('https://api.vital-helth.com/uploade_image');
        browser.on('loadstop').subscribe(event => {
                console.log('sus: ', event);
            },
            error => {
                console.log('error: ', error);
            });
    }
}
