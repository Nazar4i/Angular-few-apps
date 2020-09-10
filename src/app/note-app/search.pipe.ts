import { INote } from './note.i';
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "search",
    pure: true
})

export class SearchPipe implements PipeTransform {
    transform(notes: INote[], filterList: string): INote[] {
        if (!notes || !filterList) {
            return notes;
        }

        return notes.filter(note => note.title.toLowerCase().indexOf(filterList.toLowerCase()) !== -1);
    }

   
}