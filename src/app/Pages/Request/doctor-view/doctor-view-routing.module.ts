import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DoctorViewPage } from './doctor-view.page';

const routes: Routes = [
  {
    path: '',
    component: DoctorViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DoctorViewPageRoutingModule {}
