import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-components-topic',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './components-topic.html',
    styleUrl: './components-topic.css'
})
export class ComponentsTopicComponent implements OnInit {
    showInteractiveExample = false;
    componentCode = `@Component({
  selector: 'app-example',
  template: '<div>{{ message }}</div>',
  styles: ['.container { padding: 10px; }']
})
export class ExampleComponent {
  message = 'Hello Angular!';
}`;

    constructor() { }

    ngOnInit() { }

    toggleInteractiveExample() {
        this.showInteractiveExample = !this.showInteractiveExample;
    }
}
