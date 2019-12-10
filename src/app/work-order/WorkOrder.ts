import Worker from './Worker';

export default class WorkOrder {
  id: string;
  name: string;
  description: string;
  deadline: number;
  workerId: number;
  worker?: Worker;
}
