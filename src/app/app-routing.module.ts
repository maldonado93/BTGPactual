import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PqrComponent}  from "./pqr/pqr.component"

const routes: Routes = [
  { path: "", component: PqrComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
