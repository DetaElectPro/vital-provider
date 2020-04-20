import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PharmacyDetailsPageRoutingModule } from './pharmacy-details-routing.module';

import { PharmacyDetailsPage } from './pharmacy-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PharmacyDetailsPageRoutingModule
  ],
  declarations: [PharmacyDetailsPage]
})
export class PharmacyDetailsPageModule {}
