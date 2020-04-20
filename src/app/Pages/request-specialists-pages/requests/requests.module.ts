import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RequestsPageRoutingModule } from './requests-routing.module';

import { RequestsPage } from './requests.page';
import {ExploreContainerComponentModule} from '../../../components/explore-container/explore-container.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RequestsPageRoutingModule,
        ExploreContainerComponentModule
    ],
  declarations: [RequestsPage]
})
export class RequestsPageModule {}
