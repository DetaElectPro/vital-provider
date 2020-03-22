import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';


import { RequestDetailsPage } from './request-details.page';
import {RouterModule} from '@angular/router';
import {ExploreContainerComponentModule} from '../../../components/explore-container/explore-container.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([{path: '', component: RequestDetailsPage}]),
    ExploreContainerComponentModule
  ],
  declarations: [RequestDetailsPage]
})
export class RequestDetailsPageModule {}
