import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {WalletPage} from './wallet.page';
import {InAppBrowser} from '@ionic-native/in-app-browser';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        RouterModule.forChild([{path: '', component: WalletPage}])
    ],
    declarations: [WalletPage],
    providers: [InAppBrowser]
})
export class WalletPageModule {
}
