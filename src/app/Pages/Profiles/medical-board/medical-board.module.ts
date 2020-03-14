import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MedicalBoardPageRoutingModule } from './medical-board-routing.module';

import { MedicalBoardPage } from './medical-board.page';
import {IonicSelectableModule} from 'ionic-selectable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MedicalBoardPageRoutingModule,
    IonicSelectableModule,
  ],
  declarations: [MedicalBoardPage]
})
export class MedicalBoardPageModule {}
