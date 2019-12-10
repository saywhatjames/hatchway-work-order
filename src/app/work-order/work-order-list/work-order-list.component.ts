import {Component, OnInit} from '@angular/core';
import {WorkOrderService} from '../work-order.service';
import WorkOrder from '../WorkOrder';
import {WorkOrderNamePipe} from '../work-order-name.pipe';


@Component({
  selector: 'app-work-order-list',
  templateUrl: './work-order-list.component.html',
  styleUrls: ['./work-order-list.component.css']
})
export class WorkOrderListComponent implements OnInit {

  sortByEarliest = true;
  workOrders: WorkOrder[];
  searchText: string;
  errorMessage: string;
  workOrderCache: WorkOrder[];
  flowers;

  constructor(private wos: WorkOrderService, private wonPipe: WorkOrderNamePipe) {
  }

  sortDeadline(a, b) {
    return a.deadline - b.deadline;
  }

  toggleSort() {
    this.sortByEarliest = !this.sortByEarliest;
    if (this.sortByEarliest) {
      this.workOrders.sort(this.sortDeadline);
    } else {
      this.workOrders.sort(this.sortDeadline).reverse();
    }

  }

  ngOnInit() {
    this.wos.getFlowers().subscribe(data => console.log(data));
    this.wos
      .getWorkOrders()
      .subscribe((data) => {
        this.workOrders = data;
        this.workOrderCache = this.workOrders;
        this.workOrders.sort(this.sortDeadline);
      }, err => {
        this.errorMessage = err.message;
      });
  }

  onChange($event: any) {
    this.workOrders = this.wonPipe.transform(this.workOrders, this.searchText);
    if (this.searchText === '') {
      this.workOrders = this.workOrderCache;
    }
  }

  clear() {
    this.searchText = '';
    this.workOrders = this.workOrderCache;
  }
}
