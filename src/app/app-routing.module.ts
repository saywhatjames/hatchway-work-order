import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {WorkOrderListComponent} from './work-order/work-order-list/work-order-list.component';


const routes: Routes = [
  {path: '', redirectTo: 'work-order-list', pathMatch: 'full'},
  {
    path: 'work-order-list',
    component: WorkOrderListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
