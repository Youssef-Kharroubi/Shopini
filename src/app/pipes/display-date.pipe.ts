import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'displayDate'
})
export class DisplayDatePipe implements PipeTransform {
  transform(value: any): string {
    if (!value) {
      return 'Invalid date';
    }

    let date: Date;
    if (value instanceof Date) {
      date = value;
    } else {
      date = new Date(value);
      if (isNaN(date.getTime())) {
        return 'Invalid date';
      }
    }

    return date.toDateString();
  }
}
