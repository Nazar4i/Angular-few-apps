import { INote } from './../note.i';
import { Component, Input, Output } from "@angular/core";
import { EventEmitter } from '@angular/core'
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: "note-item",
    templateUrl: "note-item.component.html"
})

export class NoteItemComponent {
    faTimes = faTimes;
    @Input() note: INote;
    @Input() isLast: boolean;
    @Output() deleteNoteItem = new EventEmitter();

    deleteNote(id: string) {
        this.deleteNoteItem.emit(id);
    }
}