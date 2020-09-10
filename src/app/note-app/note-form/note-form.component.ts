import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NoteService } from './../note.service';
import { INote } from './../note.i';
import { Component, OnInit } from "@angular/core";

@Component({
    selector: "note-form",
    templateUrl: "note-form.component.html"
})

export class NoteFormComponent implements OnInit{
    public noteForm: FormGroup;
    public note: INote;

    constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router, 
        private noteService: NoteService) {}

    ngOnInit() {
        this.createForm();
        this.setDataToForm();
    }

    private setDataToForm() {
        const id = this.route.snapshot.paramMap.get("id");

        if (!id) {
            return;
        }

        this.noteService.getNote(id).subscribe((note: INote) => {
            if (note) {
                this.note = note;
                this.noteForm.patchValue({
                    title: note.title,
                    description: note.description
                })
            }
        })
    }

    private createForm() {
        this.noteForm = this.fb.group({
          title: [''],
          description: ['']
        });
    }

    onSubmit() {
        if (this.note) {
            this.noteService.updateNote(this.note.id, this.noteForm.value).subscribe(() => {
                this.router.navigate(['notes']);
            })
        } else {
            this.noteService.createNote(this.noteForm.value).subscribe(() => {
                this.router.navigate(['notes']);
            })
        }
    }
}