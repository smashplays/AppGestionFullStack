import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterTerminado',
})
export class FilterTerminadoPipe implements PipeTransform {
  transform(list: any[], value: string) {
    return value
      ? list.filter(
          (item) => item.client.name.toLowerCase() === value.toLowerCase()
        )
      : list;
  }
}
