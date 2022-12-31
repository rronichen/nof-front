import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppoitmentListComponent } from './appoitment-list/appoitment-list.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'appointment-list', component: AppoitmentListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
