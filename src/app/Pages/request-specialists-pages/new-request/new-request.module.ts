import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { NewRequestPage } from './new-request.page';
import {IonicSelectableModule} from 'ionic-selectable';
import {RouterModule} from '@angular/router';
import {ExploreContainerComponentModule} from '../../../components/explore-container/explore-container.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IonicSelectableModule,
    ReactiveFormsModule,
    RouterModule.forChild([{path: '', component: NewRequestPage}]),
    ExploreContainerComponentModule

  ],
  declarations: [NewRequestPage]
})
export class NewRequestPageModule {}
