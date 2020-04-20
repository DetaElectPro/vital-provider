import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';


import {NewRequestPage} from './new-request.page';
import {RouterModule} from '@angular/router';
import {EmergencyTabsComponentModule} from '../../../components/emergency-tabs/emergency-tabs.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild([{path: '', component: NewRequestPage}]),
        EmergencyTabsComponentModule

    ],
    declarations: [NewRequestPage]
})
export class RequestPageModule {
}
