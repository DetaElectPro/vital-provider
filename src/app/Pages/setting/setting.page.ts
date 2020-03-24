import {Component, OnInit} from '@angular/core';
import {Storage} from '@ionic/storage';
import {AuthService} from '../../Service/auth.service';
import {error} from 'util';
import {Router} from '@angular/router';

@Component({
    selector: 'app-tab2',
    templateUrl: 'setting.page.html',
    styleUrls: ['setting.page.scss']
})
export class SettingPage implements OnInit {
    token: any;
    image = '../assets/images/man.png';
    userInfo: any;


    constructor(
        private storage: Storage,
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
}
