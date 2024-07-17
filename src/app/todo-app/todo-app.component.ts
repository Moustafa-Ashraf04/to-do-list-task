import { Component, OnInit } from '@angular/core';
import { ToDo } from '../interface/to-do';
import { AddTaskComponent } from '../add-task/add-task.component';
import { DisplayTasksComponent } from '../display-tasks/display-tasks.component';

@Component({
  selector: 'app-todo-app',
  standalone: true,
  imports: [AddTaskComponent, DisplayTasksComponent],
  templateUrl: './todo-app.component.html',
  styleUrl: './todo-app.component.css',
})
export class TodoAppComponent implements OnInit {
  taskExists: string | null = null;

  todos: ToDo[] = [];

  ngOnInit(): void {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      this.todos = JSON.parse(storedTodos);
    }
  }

  onAddTask(newTask: string) {
    // deny adding duplicate tasks 
    if (!this.todos.some((t) => t.task === newTask)) {
      this.todos.push({
        id: this.todos.length + 1,
        task: newTask,
        completed: false,
      });
      this.updateLocalStorage();

      this.taskExists = null;
    } else {
      this.taskExists = 'Task already exists';
      setTimeout(() => {
        this.taskExists = null;
      }, 3000);
    }
  }

  onDeleteTask(id: number) {
    this.todos = this.todos.filter((todo) => todo.id !== id);

    this.updateLocalStorage();
  }

  onClearTodoList() {
    this.todos = [];
    localStorage.removeItem('todos');
  }

  private updateLocalStorage() {
    // Update local storage with current todos array
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }
}
