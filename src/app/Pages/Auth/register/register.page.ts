import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../Service/auth.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-register',
    templateUrl: './register.page.html',
    styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
    registerData: any = {name: '', phone: '', password: '', password_check: '', role: 3, fcm_registration_in: ''};

    result: any;

    constructor(private authServe: AuthService, private route: Router) {
    }

    ngOnInit() {
        this.registerData.fcm_registration_in = localStorage.getItem('fcm_registration_in');
    }

    userRegister() {
        if (this.registerData.password === this.registerData.password_check) {
            this.authServe.registerServes(this.registerData)
                .then(data => {
                    this.result = data;
                    if (this.result.error) {
                        alert(`Message: ${this.result.message}`);
                    } else {
                        this.route.navigate(['/login']);
                    }
                })
                .catch(err => {
                    console.log('serve Error: ', err);
                });
        } else {
            alert(`password don't match`);
        }
    }
}
