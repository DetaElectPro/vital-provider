import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MedicalBoardPage } from './medical-board.page';

const routes: Routes = [
  {
    path: '',
    component: MedicalBoardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MedicalBoardPageRoutingModule {}
