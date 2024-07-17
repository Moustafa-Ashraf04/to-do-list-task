import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ToDo } from '../interface/to-do';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css',
})
export class AddTaskComponent {
  inputRequired: string | null = null;
  
  @Input() todos: ToDo[] = [];

  @Output() addTask = new EventEmitter<string>();

  onSubmit(form: NgForm) {
    if (form.valid) {
      const todo = form.value.task;

      this.addTask.emit(todo);
      form.reset();
      this.inputRequired = null;
    } else {
      this.inputRequired = 'Field is required';
    }
  }
}
