import { Component, VERSION } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  // tasks: string[] = [];
  tasks: any[] = [];
  inputTask: string = "";
  allCompleted=false;
  id = 0;
  priorityTask:string = "0";
  addTask(task:string) {
    this.tasks.push({
      id: this.id++,
      name: task,
      state: false,
      priority: parseInt(this.priorityTask),
      priorityText: this.translatePriority(parseInt(this.priorityTask))
    });
    console.log(this.tasks);
    
    this.checkCompleted()
  }

  removeTask(index:number) {
    const taskIndex = this.tasks.findIndex(el=>el.id===index);
    this.tasks.splice(taskIndex,1);
    if(this.tasks.length > 0){
      this.checkCompleted();
    }
    
  }

  translatePriority(priority:number){
    switch (priority) {
      case 0:
        return "Prioridad baja"
      case 1:
        return "Prioridad media"
      case 2:
        return "Prioridad alta"
      default:
        return "Error en la asignación de prioridad";
    }
  }

  completeTask(task:any){
    if(task.state===true){
      task.state = false;
      this.checkCompleted()
    }else{
      task.state = true;
      this.checkCompleted()
    }
    
  }
  checkCompleted(){
    if(this.tasks.every(el => el.state)){
      this.allCompleted=true;
      setTimeout(()=>{
        this.allCompleted = false;
      }, 5000)
    }else{
      this.allCompleted=false;
    }
  }

  sortTasks(){
    this.tasks.reverse();
  }
  sortByPriority(){
    
    this.tasks.sort((a, b) => {
      if(a.priority > b.priority){
        return -1;
      }
      if(a.priority < b.priority){
        return 1;
      }
      return 0;
    });
    
  }
}
