import { NoteItemComponent } from './note-item/note-item.component';
import { NgModule } from "@angular/core";
import { NoteComponent } from './note.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { NoteService } from './note.service';
import { Routes, RouterModule } from '@angular/router';
import { NoteFormComponent } from './note-form/note-form.component';
import { ReactiveFormsModule, FormsModule }   from '@angular/forms';
import { SearchPipe } from './search.pipe';

const routes: Routes = [
    { path: '', component: NoteComponent }, 
    { path: 'create', component: NoteFormComponent },
    { path: 'view/:id', component: NoteFormComponent }
]

@NgModule({
    imports: [
        FontAwesomeModule, 
        CommonModule, 
        FormsModule, 
        ReactiveFormsModule, 
        RouterModule.forChild(routes)
    ],
    declarations: [
        NoteComponent,
        NoteItemComponent, 
        NoteFormComponent, 
        SearchPipe
    ],
    providers: [NoteService]
})

export class NoteModule {}