import {Component, OnInit} from '@angular/core';
import {WalletService} from '../../../Service/wallet.service';
import {LoadingController} from '@ionic/angular';

@Component({
    selector: 'app-wallet',
    templateUrl: 'wallet.page.html',
    styleUrls: ['wallet.page.scss']
})
export class WalletPage implements OnInit {

    data: any;
    private errorMesg: any;

    constructor(
        private loadingController: LoadingController,
        private walletServ: WalletService
    ) {
    }

    ngOnInit(): void {
        this.loadData();
    }

    async loadData() {
        const loading = await this.loadingController.create({
            message: 'Please wait...',
            spinner: 'bubbles',
            translucent: true,
        });
        await loading.present();
        await this.walletServ.getBalanceService()
            .subscribe(
                data => {
                    loading.dismiss();
                    this.data = data;
                    this.data = this.data.data;
                },
                error => {
                    loading.dismiss();
                    console.log(this.errorMesg = error);
                }
            );
    }

    bokApp() {
        window.open('android-app://com.mode.bok.ui', '_system');
    }
}
