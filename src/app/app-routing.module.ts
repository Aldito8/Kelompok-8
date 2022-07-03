import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { DashboardComponent } from './employee/dashboard/dashboard.component';
import { ViewComponent } from './employee/view/view.component';

const routes: Routes = [
  { path: '', component: DashboardComponent},
  { path: 'employee/:id', component: ViewComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
