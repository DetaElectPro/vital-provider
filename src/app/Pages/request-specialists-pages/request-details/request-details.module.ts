import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';


import {RequestDetailsPage} from './request-details.page';
import {RouterModule} from '@angular/router';
import {InAppBrowser} from '@ionic-native/in-app-browser/ngx';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild([{path: '', component: RequestDetailsPage}]),
    ],
    providers: [InAppBrowser],
    declarations: [RequestDetailsPage],
})
export class RequestDetailsPageModule {
}
