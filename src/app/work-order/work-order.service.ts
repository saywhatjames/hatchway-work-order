import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map, publishReplay, refCount, shareReplay, take} from 'rxjs/operators';
import WorkOrder from './WorkOrder';
import Worker from './Worker';
import {tap} from 'rxjs/internal/operators/tap';
import {of} from 'rxjs/internal/observable/of';

@Injectable({
  providedIn: 'root'
})
export class WorkOrderService {

  uri = 'https://www.hatchways.io/api/assessment';
  workers: Observable<Worker>[] = [];

  constructor(private http: HttpClient) {
  }

  getFlowers(): Observable<any> {
    let auth = {
      username: '221781',
      password: 'ENxfAE'
    };
     let auths = btoa('221781:ENxfAE')
    return this
      .http
      .get<WorkOrder>(`https://www.floristone.com/api/rest/flowershop/getproducts`, {
        headers: {Authorization: 'Basic ' + auths}})
      .pipe(map((res: any) => {
          console.log(res);
          return res;
        }),
        catchError((err, caught) => {
          this.errorHandler(err);
          return throwError(err);
        }));
  }

  getWorkOrders(): Observable<WorkOrder[]> {
    return this
      .http
      .get<WorkOrder>(`${this.uri}/work_orders`)
      .pipe(map((res: any) => {
          const workOrder = res.orders;
          this.joinResponse(workOrder);
          return workOrder;
        }),
        catchError((err, caught) => {
          this.errorHandler(err);
          return throwError(err);
        }));
  }

  errorHandler(error: any): void {
    console.log(error);
  }

  joinResponse(workOrders: WorkOrder[]) {
    workOrders.forEach(workorder => {
        workorder.deadline = +new Date(1000 * workorder.deadline);
        this.getWorker(workorder.workerId).subscribe(worker => {
          Object.assign(workorder, worker);
        });
      }
    );
  }

  getWorker(workerId): Observable<Worker> {
    if (!this.workers[workerId]) {
      this.workers[workerId] = this.http
        .get(`${this.uri}/workers/${workerId}`, workerId)
        .pipe(map((res: any) => {
            return res;
          }),
          catchError((err, caught) => {
            this.errorHandler(err);
            return throwError(err);
          }),
          publishReplay(1),
          refCount(),
          //take(1),
        );
    }
    return this.workers[workerId];
  }

}
