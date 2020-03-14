import {Component} from '@angular/core';
import {WalletService} from '../../Service/wallet.service';

@Component({
    selector: 'app-wallet',
    templateUrl: 'wallet.page.html',
    styleUrls: ['wallet.page.scss']
})
export class WalletPage {

    data: any;
    private errorMesg: any;

    constructor(
        private walletServ: WalletService
    ) {
    }


    async loadData() {
        await this.walletServ.getBalanceService()
            .subscribe(
                data => {
                    console.log(this.data = data);
                },
                error => {
                    console.log(this.errorMesg = error);
                }
            );
    }
}