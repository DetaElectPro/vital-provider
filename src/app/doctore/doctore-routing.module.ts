import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DoctorePage } from './doctore.page';

const routes: Routes = [
  {
    path: '',
    component: DoctorePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DoctorePageRoutingModule {}
