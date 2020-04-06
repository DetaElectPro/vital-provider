import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccepPharmacyPage } from './accep-pharmacy.page';

const routes: Routes = [
  {
    path: '',
    component: AccepPharmacyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccepPharmacyPageRoutingModule {}
