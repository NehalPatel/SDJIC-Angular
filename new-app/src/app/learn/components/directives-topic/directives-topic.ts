import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-directives-topic',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './directives-topic.html',
    styleUrl: './directives-topic.css'
})
export class DirectivesTopicComponent implements OnInit {
    isVisible = true;
    items = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];
    isActive = false;
    selectedFruit: string = 'orange';
    highlightColor = 'yellow';
    customText = 'This text can be highlighted!';
    showHighlightDemo = false;

    textColor: string = 'black'; // Add this property
    fontSize: string = '16px'; // Add this property
    fontWeight: string = 'normal'; // Add this property

    constructor() { }

    ngOnInit() { }

    toggleVisibility() {
        this.isVisible = !this.isVisible;
    }

    toggleActive() {
        this.isActive = !this.isActive;
    }

    addItem() {
        this.items.push(`Item ${this.items.length + 1}`);
    }

    removeItem() {
        if (this.items.length > 0) {
            this.items.pop();
        }
    }

    toggleHighlightDemo() {
        this.showHighlightDemo = !this.showHighlightDemo;
    }

    changeHighlightColor(color: string) {
        this.highlightColor = color;
    }

    changeTextColor(color: string) {
        this.textColor = color;
    }
}
