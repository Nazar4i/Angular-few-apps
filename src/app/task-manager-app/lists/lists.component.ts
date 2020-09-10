import { ITask } from './../shared/task.i';
import { IList } from './../shared/list.i';
import { TaskService } from './../shared/task.service';
import { Component, OnInit } from "@angular/core";
import { faCog, faPlusCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: "lists",
    templateUrl: "lists.component.html"
})

export class ListsComponent implements OnInit {
    public faCog = faCog;
    public faPlusCircle = faPlusCircle;

    public lists: IList[] = [];
    public selectedList: IList;
    public tasks: ITask[] = [];
    public isSettings: boolean;
    public activeItemNumber: number;

    constructor(private taskService: TaskService) {}

    ngOnInit() {
        this.getLists();
    }

    getLists() {
        this.taskService.getLists().subscribe(res => {
            if (res && res.length) {
                this.lists = res;
                this.selectList(0);
            } else {
                this.lists = [];
            }
           
        })
    }

    selectList(index: number) {
        this.activeItemNumber = index;
        this.selectedList = this.lists[index];
        this.taskService.setCurrentListId(this.selectedList.id);
        this.taskService.getTasksByListId(this.selectedList.id).subscribe((tasks: ITask[]) => {
            this.tasks = tasks;
        })
    }

    showSettngs() {
        this.isSettings = !this.isSettings;
    }

    deleteList(listId: number) {
        this.taskService.deleteList(listId).subscribe(() => {
            this.getLists();
            this.isSettings = false;
        })
    }
}