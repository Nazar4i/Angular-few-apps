import { Component, OnInit } from "@angular/core";
import { TaskService } from '../shared/task.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ITask } from '../shared/task.i';

@Component({
    selector: "add-task",
    templateUrl: "add-task.component.html"
})

export class AddTaskComponent implements OnInit {
    public taskname: string;
    public title: string;
    private taskId: number;

    constructor(private taskServise: TaskService, private router: Router, private activateRoute: ActivatedRoute) {}

    ngOnInit() {
        this.taskId = this.activateRoute.snapshot.params['taskId'];
        
        if (this.taskId) {
            this.taskServise.getTasks().subscribe(res => {
                res.filter(el => {
                    if(el.id == this.taskId) {
                        this.title = 'Edit task';
                        this.taskname = el.name;
                    }
                });
            })
        } else {
            this.title = 'Create a new task';
        }
    }

    onSubmit(taskname: string) {
        const currentListId = this.taskServise.getCurrentListId();

        const task: ITask = {
            listId: currentListId,
            name: taskname,
            ready: false
        }


        if (this.taskId) {
            this.taskServise.editTask(this.taskId, task).subscribe(() => {
                this.router.navigate(['/task/lists']);
            })
        } else {
            this.taskServise.addTask(task).subscribe(()=> {
                this.router.navigate(['/task/lists']);
            })
        }

    }
}