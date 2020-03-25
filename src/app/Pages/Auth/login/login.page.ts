import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../Service/auth.service';
import {Router} from '@angular/router';

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
        // private storage: Storage
    ) {
    }

    ngOnInit() {
        this.loginData.fcm_registration_in = localStorage.getItem('fcm_registration_in');
    }


    userLogin() {
        this.authServe.loginServes(this.loginData)
            .then(data => {
                this.usersData = data;
                if (this.usersData.error) {
                    alert('error data');
                } else {
                    localStorage.setItem('token', this.usersData.token);
                    if (this.usersData.user.status === 1) {
                        this.router.navigate(['/medical-board']);
                    }
                    if (this.usersData.user.status === 2) {
                        this.router.navigate(['/']);
                    }
                }
            })
            .catch(err => {
                console.log('serve Error: ', err);
            });
    }
}
