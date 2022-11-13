import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'timeFormat'
})
export class TimeFormatPipe implements PipeTransform {
    public transform(time_in_sec: any) {
        const min = Math.floor(time_in_sec / 60);
        const sec = time_in_sec - (min * 60);

        return min > 0 ? `${min}:${sec}` : time_in_sec;
    }
}
