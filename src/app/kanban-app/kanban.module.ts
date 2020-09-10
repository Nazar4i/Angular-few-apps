import { KanbanService } from './kanban.service';
import { FormsModule } from '@angular/forms';
import { KanbanComponent } from './kanban.component';
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import {DragDropModule} from '@angular/cdk/drag-drop';

const routes: Routes = [
    { path: '', component: KanbanComponent },
]

@NgModule({
    imports: [
        FontAwesomeModule, 
        FormsModule,
        CommonModule, 
        DragDropModule,
        RouterModule.forChild(routes)
    ],
    exports: [],
    declarations: [KanbanComponent],
    providers: [KanbanService]
})

export class KanbanModule {}