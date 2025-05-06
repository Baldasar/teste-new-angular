import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterById',
  standalone: true,
})
export class FilterByIdPipe implements PipeTransform {
  transform(value: any[], id: string): any[] {
    if (!value || !id) {
      return value;
    }
    return value.filter((item) => item.id == id);
  }
}
