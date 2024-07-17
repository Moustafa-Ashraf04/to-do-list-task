import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ToDo } from '../interface/to-do';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-display-tasks',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './display-tasks.component.html',
  styleUrl: './display-tasks.component.css',
})
export class DisplayTasksComponent {
  @Input() todos: ToDo[] = [];
  @Output() deleteTask = new EventEmitter<number>();

  onDeleteTask(id: number) {
    this.deleteTask.emit(id);
  }

  onCompleteTask(id: number) {
    this.todos[id - 1].completed = !this.todos[id - 1].completed;
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }
}
