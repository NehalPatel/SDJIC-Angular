import { Component } from '@angular/core';
import { LifecycleDemoComponent } from './lifecycle-demo.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LifecycleDemoComponent, FormsModule],
  templateUrl: './app.html'
})
export class App {
  counter = 1;
  inputUsername = 'Nehal';

  incrementCounter() {
    this.counter++;
  }
}
