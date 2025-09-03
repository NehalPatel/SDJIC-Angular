import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { InitialsPipe } from './initials.pipe';
import { TruncatePipe } from './truncate.pipe';

@Component({
    selector: 'app-pipes-topic',
    standalone: true,
    imports: [CommonModule, InitialsPipe, TruncatePipe],
    templateUrl: './pipes-topic.html',
    styleUrl: './pipes-topic.css'
})
export class PipesTopicComponent {
    // Example data for pipes
    name = 'Devashya Patel';
    amount = 1234.5;
    ratio = 0.3567;
    today = new Date();
    items = ['Angular', 'React', 'Vue'];
    longText = 'This is a long sentence that needs to be truncated';

    // Data for custom pipe demo
    fullName = 'Krishna Jariwala';

    // Text to highlight
    textToHighlight = 'This text will be highlighted';
}
