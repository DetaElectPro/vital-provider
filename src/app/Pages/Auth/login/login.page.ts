import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../Service/auth.service';
import {Router} from '@angular/router';
import {LoadingController} from '@ionic/angular';

// import {Storage} from '@ionic/storage';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    loginData = {phone: '', password: '', role: 3, fcm_registration_in: ''};
    usersData: any = [];

    constructor(
        private authServe: AuthService,
        private router: Router,
        public loadingController: LoadingController
        // private storage: Storage
    ) {
    }

    ngOnInit() {
        this.loginData.fcm_registration_in = localStorage.getItem('fcm_registration_in');
    }


    async userLogin() {
        const loading = await this.loadingController.create({
            message: 'Please wait...',
            translucent: true,

        });
        await loading.present();
        this.authServe.loginServes(this.loginData)
            .then(async response => {
                await loading.dismiss();
                this.usersData = response;
                if (this.usersData.error) {
                    alert('error data');
                } else {
                    localStorage.setItem('token', this.usersData.token);
                    if (this.usersData.user.status === 1) {
                        this.router.navigate(['/medical-board']);
                    }
                    if (this.usersData.user.status === 2 || this.usersData.user.status === 3) {
                        this.router.navigate(['/']);
                    }
                }
            })
            .catch(async err => {
                await loading.dismiss();
                console.log('serve Error: ', err);
            });
    }
}
