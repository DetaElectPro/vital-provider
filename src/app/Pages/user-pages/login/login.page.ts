import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../Service/auth.service';
import {Router} from '@angular/router';
import {AlertController, LoadingController, NavController, ToastController} from '@ionic/angular';
import {FormControl, FormGroup, Validators} from '@angular/forms';


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
    LoginForm: FormGroup;


    constructor(
        private authServe: AuthService,
        private router: Router,
        private navCtrl: NavController,
        public loadingController: LoadingController,
        public alertController: AlertController,
        public toastController: ToastController
    ) {
        this.LoginForm = new FormGroup({
            phone: new FormControl('', [Validators.required,
                Validators.pattern('(^9\\d{8}$)|(^1\\d{8}$)'),
                Validators.minLength(9), Validators.maxLength(9)]),
            password: new FormControl('', [Validators.required,
                Validators.minLength(6), Validators.maxLength(25)]),
        });
    }

    ngOnInit() {
        this.loginData.fcm_registration_id = localStorage.getItem('fcm_registration_id');
    }


    async userLogin() {
        const phone = String(this.loginData.phone).charAt(0);
        if (phone === '0') {
            this.errorAlert(`The phone number field can't start with 0`);
        } else {
            console.log(this.loginData.phone);
            console.log(phone);
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

    async errorAlert(messageRes) {
        const alert = await this.alertController.create({
            header: 'Alert',
            cssClass: 'error-alert',
            message: `<b>${messageRes}</b>`,
            animated: true,
            buttons: ['OK']
        });

        await alert.present();
    }
}
