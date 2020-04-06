import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AmbulanceHistoryPageRoutingModule } from './ambulance-history-routing.module';

import { AmbulanceHistoryPage } from './ambulance-history.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AmbulanceHistoryPageRoutingModule
  ],
  declarations: [AmbulanceHistoryPage]
})
export class AmbulanceHistoryPageModule {}
