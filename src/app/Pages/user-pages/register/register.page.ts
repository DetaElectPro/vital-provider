import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../Service/auth.service';
import {Router} from '@angular/router';
import {LoadingController} from '@ionic/angular';

@Component({
    selector: 'app-register',
    templateUrl: './register.page.html',
    styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
    registerData: any = {name: '', phone: null, password: '', password_check: null, role: 3, fcm_registration_id: null};

    result: any;

    constructor(private authServe: AuthService, private route: Router, public loadingController: LoadingController) {
    }

    ngOnInit() {
        this.registerData.fcm_registration_id = localStorage.getItem('fcm_registration_id');
    }

    async userRegister() {
        const loading = await this.loadingController.create({
            message: 'Please wait...',
        });
        await loading.present();
        if (this.registerData.password === this.registerData.password_check) {
            this.authServe.registerServes(this.registerData)
                .then(async response => {
                    await loading.dismiss();
                    this.result = response;
                    if (this.result.error) {
                        alert(`Message: ${this.result.message}`);
                    } else {
                        this.route.navigate(['/login']);
                    }
                })
                .catch(async err => {
                    console.log('serve Error: ', err);
                    await loading.dismiss();
                });
        } else {
            alert(`password don't match`);
        }
    }
}
