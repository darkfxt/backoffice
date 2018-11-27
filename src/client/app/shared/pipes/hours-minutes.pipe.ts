import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'hoursMinutes'})

export class HoursMinutesPipe implements PipeTransform {
  transform(seconds: number): string {
    const minutes = seconds / 60;
    const h = Math.floor(minutes / 60);
    const m = Math.floor(minutes % 60);
    return `${h}<span>hs</span>  ${m}<span>min</span>`;
  }
}
