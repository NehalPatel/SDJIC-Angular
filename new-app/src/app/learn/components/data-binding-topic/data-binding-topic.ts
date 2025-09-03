import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-data-binding-topic',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './data-binding-topic.html',
    styleUrl: './data-binding-topic.css'
})
export class DataBindingTopicComponent {
    // Interpolation examples
    userName = 'Sana';
    unread = 3;

    // Property binding examples
    imageUrl = 'assets/angular-logo.png';
    isDisabled = true;

    // Event binding example
    count = 0;
    onIncrement(step: number) {
        this.count += step;
    }

    // Two-way binding example
    favoriteMovie = '';

    // Mini exercise properties
    firstName = '';
    likes = 0;

    incrementLikes() {
        this.likes++;
    }
}
