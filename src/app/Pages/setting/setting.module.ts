import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {SettingPage} from './setting.page';
// import {InAppBrowser} from '@ionic-native/in-app-browser/ngx';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{path: '', component: SettingPage}])
  ],
  // providers: [InAppBrowser],
  declarations: [SettingPage]
})
export class SettingPageModule {
}
