import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';


import {CvUpdatePage} from './cv-update.page';
import {RouterModule} from '@angular/router';
import {FileUploadModule} from 'ng2-file-upload';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([{path: '', component: CvUpdatePage}]),
    FileUploadModule,
    ReactiveFormsModule
  ],
  declarations: [CvUpdatePage]
})
export class CvUpdatePageModule {
}
