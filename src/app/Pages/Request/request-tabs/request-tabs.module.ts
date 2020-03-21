import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { RequestTabsPage } from './request-tabs.page';
import {RequestTabsRoutingModule} from './request-tabs-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RequestTabsRoutingModule
  ],
  declarations: [RequestTabsPage]
})
export class RequestTabsPageModule {}
