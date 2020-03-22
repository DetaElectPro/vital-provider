import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';
import {EmergencyTabsComponent} from './emergency-tabs.component';


@NgModule({
  imports: [CommonModule, FormsModule, IonicModule],
  declarations: [EmergencyTabsComponent],
  exports: [EmergencyTabsComponent]
})
export class EmergencyTabsComponentModule {
}
