import {Component, OnInit} from '@angular/core';
import {Storage} from '@ionic/storage';
import {AuthService} from '../../Service/auth.service';
import {Router} from '@angular/router';

// import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

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
        private authServ: AuthService,
        private route: Router) {
    }

    async logOut() {
        await this.authServ.logout()
            .then(res => {
                console.log('logOut:', res);
                this.route.navigate(['/']);
                this.storage.clear();
                localStorage.clear();

            })
            .catch(err => {
                alert(err);
                this.route.navigate(['/']);

            });
    }

    ngOnInit() {
        this.storage.get('userInfo')
            .then(res => {
                console.log('user: ', this.userInfo = res);
            })
            .catch(erro => {
                alert(erro);
            });
    }


    openPrivacyPolicy() {
        window.open('https://vital-helth.com/privacy-policy', '_blank');
    }

    openTermsAndConditions() {
        window.open('https://vital-helth.com/terms-and-conditions', '_blank');
    }
}
