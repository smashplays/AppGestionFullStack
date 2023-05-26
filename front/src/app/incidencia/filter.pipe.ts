import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(list: any[], value: string) {
    return value
      ? list.filter(
          (item) => item.client.name.toLowerCase() === value.toLowerCase()
        )
      : list;
  }
}
