import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AmbulanceHistoryPage } from './ambulance-history.page';

const routes: Routes = [
  {
    path: '',
    component: AmbulanceHistoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AmbulanceHistoryPageRoutingModule {}
