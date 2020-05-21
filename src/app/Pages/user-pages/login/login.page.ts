import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../Service/auth.service';
import {Router} from '@angular/router';
import {LoadingController, NavController, ToastController} from '@ionic/angular';


@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    loginData = {phone: null, password: null, role: 3, fcm_registration_id: null};
    usersData: any = [];
    showPass = false;
    passIcon = 'eye-outline';


    constructor(
        private authServe: AuthService,
        private router: Router,
        private navCtrl: NavController,
        public loadingController: LoadingController,
        public toastController: ToastController
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
                // console.log(response);
                await loading.dismiss();
                this.usersData = response;
                if (this.usersData.error) {
                    await loading.dismiss();
                    this.errorToast(this.usersData.message);
                } else {
                    if (this.usersData.user.status === 1) {
                        this.navCtrl.setDirection('root');
                        this.router.navigate(['/medical-board']);
                        this.passToast(this.usersData.message);
                    }
                    if (this.usersData.user.status === 2 || this.usersData.user.status === 3) {
                        this.navCtrl.navigateRoot('/tabs/home', {animationDirection: 'forward'});
                        this.passToast(this.usersData.message);
                    }
                }
            })
            .catch(async err => {
                await loading.dismiss();
                console.log('serve Error: ', err);
            });
    }

    async errorToast(messageRes) {
        const toast = await this.toastController.create({
            message: messageRes,
            duration: 5000,
            color: 'danger',
            position: 'middle',
        });
        toast.present();
    }

    async passToast(messageRes) {
        const toast = await this.toastController.create({
            message: messageRes,
            duration: 5000,
            color: 'success',
            position: 'middle',
        });
        toast.present();
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
