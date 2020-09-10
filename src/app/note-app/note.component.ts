import { Component, OnInit, OnDestroy } from "@angular/core";
import { faSearch, faPlusSquare, faTimes, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { INote } from './note.i';
import { Subscription } from 'rxjs';
import { NoteService } from './note.service';

@Component({
    selector: "note-app",
    templateUrl: "note.component.html"
})

export class NoteComponent implements OnInit, OnDestroy {
    faSearch = faSearch;
    faPlusSquare = faPlusSquare;
    faTimes = faTimes;
    faArrowRight = faArrowRight;

    public filterList: string;
    public notes: INote[] = [];
    private noteSubscribtion: Subscription;

    constructor(private noteService: NoteService) {}

    ngOnInit () {
       this.getNotes();
    }

    getNotes() {
        this.noteSubscribtion = this.noteService.getNotes().subscribe((res: INote[]) => {
            this.notes = res;
        },
        (err) => {
            console.log(err)
        });
    }

    deleteNote(id: string) {
        this.noteService.deleteNote(id).subscribe(() => {
            this.getNotes();
        },
        (err) => {
            console.log(err)
        })
    }

    ngOnDestroy() {
        if (this.noteSubscribtion) {
            this.noteSubscribtion.unsubscribe;
        }
    }
}