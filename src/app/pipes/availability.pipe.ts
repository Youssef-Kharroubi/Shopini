import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'availability'
})
export class AvailabilityPipe implements PipeTransform {
  transform(value: boolean): string {
    return value ? 'available' : 'not available';
  }
}
