import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterCliente',
})
export class FilterClientePipe implements PipeTransform {
  transform(list: any[], value: string) {
    return value
      ? list.filter((item) => item.name.toLowerCase() === value.toLowerCase())
      : list;
  }
}
