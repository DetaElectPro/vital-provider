import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DoctorePageRoutingModule } from './doctore-routing.module';

import { DoctorePage } from './doctore.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DoctorePageRoutingModule
  ],
  declarations: [DoctorePage]
})
export class DoctorePageModule {}
