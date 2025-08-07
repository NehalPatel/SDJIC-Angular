import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Counter } from './components/counter/counter';
import { Todos } from './components/todos/todos';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Counter, Todos],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('todos');
}
