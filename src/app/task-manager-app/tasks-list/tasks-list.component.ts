import { ITask } from './../shared/task.i';
import { TaskService } from './../shared/task.service';
import { IList } from './../shared/list.i';
import { Component, Input, OnInit, OnChanges, SimpleChanges } from "@angular/core";
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: "tasks-list",
    templateUrl: "tasks-list.component.html"
})

export class TasksListComponent implements OnInit, OnChanges {
    faEdit = faEdit;
    faTrash = faTrash;

    @Input() tasks: ITask[];

    constructor(private taskService: TaskService) {}


    ngOnChanges(changes: SimpleChanges): void {
        if(changes && changes['tasks']) {
            console.log(this.tasks)
            // this.taskService.setCurrentList(this.selectedList);
        }
    }

    ngOnInit() {
        // console.log(this.selectedList)
    }

    editTask(taskId: number) {

    }

    deleteTask(taskId: number) {
        const currentListId = this.taskService.getCurrentListId();
        this.taskService.deleteTask(taskId).subscribe(() => {
            this.taskService.getTasks().subscribe((tasks) => {
                if (tasks) {
                    this.tasks = [];
                    // debugger
                    for (let i = 0; i < tasks.length; i++) {
                        if (currentListId == tasks[i].listId) {
                            this.tasks.push(tasks[i])
                        }
                    }
                } else {
                    this.tasks = [];
                }
            });

            // this.getLists();
            // this.isSettings = false;
        })
    }
}