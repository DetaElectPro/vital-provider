import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FindPharmacyPageRoutingModule } from './find-pharmacy-routing.module';

import { FindPharmacyPage } from './find-pharmacy.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FindPharmacyPageRoutingModule
  ],
  declarations: [FindPharmacyPage]
})
export class FindPharmacyPageModule {}
