import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../Service/auth.service';

@Component({
    selector: 'app-password-reset',
    templateUrl: './password-reset.page.html',
    styleUrls: ['./password-reset.page.scss'],
})
export class PasswordResetPage implements OnInit {
    passwordResetData: any;
    result: any;

    constructor(private authServ: AuthService) {
    }

    ngOnInit() {
    }

    passwordResetFun() {
        alert('soon');
        this.authServ.resetPassword(this.passwordResetData)
            .subscribe(response => {
                    this.result = response;
                    console.log(response);
                },
                error1 => {
                    console.log('server Error: ', error1);
                });
    }
}
