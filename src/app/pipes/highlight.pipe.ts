import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'highlight'
})
export class highlightPipe implements PipeTransform {
  transform(value: string, searchText: string): string {
    if (!searchText) return value;
    const re = new RegExp(searchText, 'gi');
    return value.replace(re, match => `<span class="highlight">${match}</span>`);
  }
}

