import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../Service/auth.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';


@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    loginData = { phone: null, password: null, role: 3, fcm_registration_id: null };
    usersData: any = [];
    showPass = false;
    passIcon = 'eye-outline';


    constructor(
        private authServe: AuthService,
        private router: Router,
        public loadingController: LoadingController
    ) {
    }

    ngOnInit() {
        this.loginData.fcm_registration_id = localStorage.getItem('fcm_registration_id');
    }


    async userLogin() {
        const loading = await this.loadingController.create({
            message: 'Please wait...',
            translucent: true,
            spinner: 'bubbles'
        });
        await loading.present();
        this.authServe.loginServes(this.loginData)
            .then(async response => {
                console.log(response);
                await loading.dismiss();
                this.usersData = response;
                if (this.usersData.error) {
                    alert('error data');
                } else {
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

    showPassword() {
        this.showPass = !this.showPass;
        if (this.passIcon === 'eye-outline') {
            this.passIcon = 'eye-off-outline';
        } else {
            this.passIcon = 'eye-outline';
        }
    }
}
