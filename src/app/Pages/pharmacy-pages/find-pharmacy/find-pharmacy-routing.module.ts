import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FindPharmacyPage } from './find-pharmacy.page';

const routes: Routes = [
  {
    path: '',
    component: FindPharmacyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FindPharmacyPageRoutingModule {}
