import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';


import { RegisterPage } from './register.page';
import { RouterModule } from '@angular/router';
import { FileUploadModule } from 'ng2-file-upload';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild([{path: '', component: RegisterPage}]),
        FileUploadModule,
        ReactiveFormsModule,
    ],
  declarations: [RegisterPage]
})
export class RegisterPageModule {}
