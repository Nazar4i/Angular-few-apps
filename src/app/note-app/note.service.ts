import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { INote } from './note.i';

@Injectable()
export class NoteService {
    private readonly baseUrl = 'http://localhost:3000/';

    constructor(public http: HttpClient){}

    getNote(id: string): Observable<INote> {
        return this.http.get<INote>(this.baseUrl + `notes/${id}`);
    }

    getNotes(): Observable<INote[]> {
        return this.http.get<INote[]>(this.baseUrl + 'notes');
    }

    createNote(body: INote): Observable<INote> {
        return this.http.post<INote>(this.baseUrl + 'notes', body);
    }

    updateNote(id: string, body: INote): Observable<INote> {
        return this.http.put<INote>(this.baseUrl + `notes/${id}`, body);
    }

    deleteNote(id: string): Observable<INote> {
        return this.http.delete<INote>(this.baseUrl + `notes/${id}`)
    }


}



// {
//     "notes": [
//         {
//             "id": 1,
//             "title": "First note",
//             "description": "Some text for first note",
//             "createdAt": "02.07.20 00:20",
//             "remindIn": "03.07.20 13:00"
//         },
//         {
//             "id": 2,
//             "title": "Second note",
//             "description": "Some text for second note",
//             "createdAt": "02.07.20 00:20",
//             "remindIn": "03.07.20 13:00"
//         },
//         {
//             "id": 3,
//             "title": "Third note",
//             "description": "Some text for third noteSome text for third noteSome text for third noteSome text for third noteSome text for third noteSome text for third noteSome text for third note",
//             "createdAt": "02.07.20 00:20",
//             "remindIn": "03.07.20 13:00"
//         }
//     ]
//   }