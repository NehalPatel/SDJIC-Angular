import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'truncate',
    standalone: true
})
export class TruncatePipe implements PipeTransform {
    transform(text: string, limit = 20, ellipsis = '…'): string {
        if (!text) return '';
        return text.length > limit ? text.slice(0, limit) + ellipsis : text;
    }
}
