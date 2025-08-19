import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, DoCheck, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, afterEveryRender, afterNextRender } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-lifecycle-demo',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './lifecycle-demo.component.html'
})
export class LifecycleDemoComponent implements OnChanges, OnInit, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy {
    @Input() counter: number = 0;
    @Input() username: string = '';

    constructor() {
        console.log('constructor: Component instance created');

        // afterNextRender - runs once after the next render cycle
        afterNextRender(() => {
            console.log('afterNextRender: Component rendered for the first time');
        });

        // afterEveryRender - runs after every render cycle
        afterEveryRender(() => {
            console.log('afterEveryRender: Component re-rendered');
        });
    }

    ngOnChanges(changes: SimpleChanges) {
        console.log('ngOnChanges called!');
        console.log('Changes object:', changes);

        // Check if specific inputs changed
        if (changes['counter']) {
            const currentValue = changes['counter'].currentValue;
            const previousValue = changes['counter'].previousValue;
            const isFirstChange = changes['counter'].firstChange;

            console.log(`Counter changed from ${previousValue} to ${currentValue}`);
            console.log(`Is first change? ${isFirstChange}`);
        }

        if (changes['username']) {
            const currentUsername = changes['username'].currentValue;
            const previousUsername = changes['username'].previousValue;
            const isFirstChange = changes['username'].firstChange;

            console.log(`Username changed from "${previousUsername}" to "${currentUsername}"`);
            console.log(`Is first change? ${isFirstChange}`);
        }
    }

    ngOnInit() {
        console.log('ngOnInit: Component initialized');
    }

    ngDoCheck() {
        console.log('ngDoCheck: Change detection run');
    }

    ngAfterContentInit() {
        console.log('ngAfterContentInit: Content projected');
    }

    ngAfterContentChecked() {
        console.log('ngAfterContentChecked: Projected content checked');
    }

    ngAfterViewInit() {
        console.log('ngAfterViewInit: View initialized');
    }

    ngAfterViewChecked() {
        console.log('ngAfterViewChecked: View checked');
    }

    ngOnDestroy() {
        console.log('ngOnDestroy: Component destroyed');
    }

    changeCounter() {
        this.counter++;
        console.log('Internal counter change - this will NOT trigger ngOnChanges');
    }

    changeUsername() {
        // this.username = 'Internal_' + Date.now();
        console.log('Internal username change - this will NOT trigger ngOnChanges');
    }
}
