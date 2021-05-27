import { Component, OnInit } from '@angular/core';
import {Todo} from './../models/todo' ;
import {concat, Observable} from 'rxjs';
import {formatNumber} from '@angular/common';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  constructor() {
  }
  todos: Todo[];
  inputTodoTitle = '';
  inputTodoContent = '';
  inputDate: Date;
  removed = [];
  // condition = true;

  inputTodoTitleEdit = '';
  inputTodoContentEdit = '';
  inputDateEdit: Date;
  public now: number;

  date: Observable<number> = new Observable(obs => {
    setInterval(() => {
      obs.next(new Date().getTime()/1000);

    }, 1000);
  });


  ngOnInit(): void {
this.todos = [];
this.now =  setInterval(() => { let s =new Date();console.log(s.getTime()/1000); return s },1000 ) ;


  }



toggleDone(id: number) {
    this.todos.map((v, i) => {
      if (i === id) {
        v.completed = !v.completed;
      }
      return v;


    });
  }

deleteTodo(id) {
    this.todos = this.todos.filter((v, i) => i !== id);
  }

addTodo() {
    if (this.inputTodoTitle !== '') {
      this.todos.push({
        title: this.inputTodoTitle,
        content: this.inputTodoContent,
        completed: false,
        deadline: this.inputDate,
        condition: true,

      });
      this.inputTodoTitle = '';
      this.inputTodoContent = '';
      this.inputDate = undefined
    }

  }

edit(id) {


    this.inputTodoContentEdit = this.todos[id].content;
    this.inputTodoTitleEdit = this.todos[id].title;
    this.inputDateEdit = this.todos[id].deadline;
    console.log(this.inputTodoTitleEdit, this.inputTodoContentEdit);
    // this.deleteTodo(id)

    // this.todos[id].content = '1';
  }

upId(id) {
    if (id > 0) {
      this.removed = this.todos.splice(id, 1);
      this.todos.splice(id - 1, 0, this.removed[0]);
    }
}
downId(id) {

    this.removed = this.todos.splice(id, 1)  ;
    this.todos.splice(id + 1, 0, this.removed[0]);
  }



  conditionToggle( id: number ) {
  this.todos.map((item, i) => {
    if (i === id) {
      item.condition = !item.condition;
      console.log(item.condition)
      return item.condition;
    }


  })
}




deadlineCheck(id){

 // this.now =  new Date().getTime();
 // console.log( this.todos[id].deadline.getTime(), this.now);
}


}

