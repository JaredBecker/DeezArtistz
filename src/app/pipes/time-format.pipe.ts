import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'timeFormat'
})
export class TimeFormatPipe implements PipeTransform {
    public transform(time_in_sec: any) {
        // Takes the time of the song in seconds and gives back a readable time
        let min = Math.floor(time_in_sec / 60);
        let sec = time_in_sec - (min * 60);

        return min > 0 ? `${min}:${sec < 10 ? `0${sec}` : sec}` : time_in_sec;
    }
}
