import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todos',
  imports: [CommonModule, FormsModule],
  templateUrl: './todos.html',
  styleUrl: './todos.css'
})
export class Todos {
  todos: String[] = [
    'Learn Angular',
    'Build a todo app',
    'Have fun!'
  ];
  newTodo: string = '';

  addTodo() {
    const text = this.newTodo.trim();
    if (text) {
      this.todos.push(text);
      this.newTodo = '';
    }
  }
}
