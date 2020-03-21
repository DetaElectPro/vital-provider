import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DoctorViewPageRoutingModule } from './doctor-view-routing.module';

import { DoctorViewPage } from './doctor-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DoctorViewPageRoutingModule
  ],
  declarations: [DoctorViewPage]
})
export class DoctorViewPageModule {}
