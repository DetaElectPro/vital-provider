import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PharmacyDetailsPage } from './pharmacy-details.page';

const routes: Routes = [
  {
    path: '',
    component: PharmacyDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PharmacyDetailsPageRoutingModule {}
