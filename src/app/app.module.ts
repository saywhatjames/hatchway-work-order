import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {WorkOrderListComponent} from './work-order/work-order-list/work-order-list.component';
import {WorkerComponent} from './work-order/worker/worker.component';
import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import { WorkOrderNamePipe } from './work-order/work-order-name.pipe';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    WorkOrderListComponent,
    WorkerComponent,
    WorkOrderNamePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [WorkOrderNamePipe],
  bootstrap: [AppComponent]
})
export class AppModule {
}
