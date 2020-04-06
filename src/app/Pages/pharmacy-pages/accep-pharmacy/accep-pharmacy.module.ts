import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccepPharmacyPageRoutingModule } from './accep-pharmacy-routing.module';

import { AccepPharmacyPage } from './accep-pharmacy.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccepPharmacyPageRoutingModule
  ],
  declarations: [AccepPharmacyPage]
})
export class AccepPharmacyPageModule {}
