import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'initials',
    standalone: true
})
export class InitialsPipe implements PipeTransform {
    transform(value: string | null | undefined): string {
        if (!value) return '';
        return value
            .trim()
            .split(/\s+/)
            .map(part => part.charAt(0).toUpperCase())
            .join('');
    }
}
