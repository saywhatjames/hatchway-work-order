import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'workOrderName'
})
export class WorkOrderNamePipe implements PipeTransform {

  transform(items: any[], searchText: string): any[] {
    let result;
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.toLowerCase();

    result = items.filter(it => {
      if (it.worker.name.toLowerCase().includes(searchText)) {
        return it;
      }
    });
    return result;
  }


}
