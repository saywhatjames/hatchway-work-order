import {Component, Input, OnInit} from '@angular/core';
import Worker from '../Worker';


@Component({
  selector: 'app-worker',
  templateUrl: './worker.component.html',
  styleUrls: ['./worker.component.css']
})
export class WorkerComponent implements OnInit {
  @Input() worker: Worker;

  constructor() {
  }

  ngOnInit() {

  }

}
