import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';


import {ImageUpdatePage} from './image-update.page';
import {RouterModule} from '@angular/router';
import {FileUploadModule} from 'ng2-file-upload';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild([{path: '', component: ImageUpdatePage}]),
        FileUploadModule,
        ReactiveFormsModule
    ],
    declarations: [ImageUpdatePage]
})
export class ImageUpdatePageModule {
}
