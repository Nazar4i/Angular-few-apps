import { AddTaskComponent } from './add-task/add-task.component';
import { ListsComponent } from './lists/lists.component';
import { TaskComponent } from './task.component';
import { TaskService } from './shared/task.service';
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { AddListComponent } from './add-list/add-list.component';
import { TasksListComponent } from './tasks-list/tasks-list.component'

const routes: Routes = [
    { path: '', component: TaskComponent, children: [
        { path: '', redirectTo: 'lists', pathMatch: 'full'},
        { path: 'lists', component: ListsComponent},
        { path: 'new-list', component: AddListComponent},
        { path: 'edit-list/:listId', component: AddListComponent},
        { path: 'edit-task/:taskId', component: AddTaskComponent},
        { path: 'add-task', component: AddTaskComponent}
    ] },
]

@NgModule({
    imports: [
        FormsModule, 
        FontAwesomeModule, 
        CommonModule,
        RouterModule.forChild(routes)
    ],
    exports: [],
    declarations: [TaskComponent, ListsComponent, AddListComponent, TasksListComponent, AddTaskComponent],
    providers: [TaskService]
})

export class TaskModule {}