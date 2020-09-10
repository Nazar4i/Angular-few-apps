import { Router, ActivatedRoute } from '@angular/router';
import { IList } from './../shared/list.i';
import { TaskService } from './../shared/task.service';
import { Component, OnInit } from "@angular/core";

@Component({
    selector: "add-list",
    templateUrl: "add-list.component.html"
})

export class AddListComponent implements OnInit {

    public listname: string;
    public title: string;
    private listId: number;

    constructor(private taskServise: TaskService, private router: Router, private activateRoute: ActivatedRoute) {}

    ngOnInit() {
        this.listId = this.activateRoute.snapshot.params['listId'];

        if (this.listId) {
            this.taskServise.getLists().subscribe(res => {
                res.filter(el => {
                    if(el.id == this.listId) {
                        this.title = 'Edit list';
                        this.listname = el.name;
                    }
                    
                });
            })
        } else {
            this.title = 'Create a new list';
        }
    }

    onSubmit(listname: string) {
        const list: IList = {
            name: listname,    
        }

        if (this.listId) {
            this.taskServise.editList(this.listId, list).subscribe(() => {
                this.router.navigate(['/task/lists']);
            })
        } else {
            this.taskServise.addList(list).subscribe(() => {
                this.router.navigate(['/task/lists']);
            })
        }
    }
}