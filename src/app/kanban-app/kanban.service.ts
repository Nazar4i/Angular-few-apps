import { IKanban } from './kanban.i';
import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class KanbanService {
    private readonly baseUrl = 'http://localhost:3000/';

    constructor(public http: HttpClient){}

    getAll(): Observable<any> {
        return this.http.get(this.baseUrl + 'kanban');
    }

    update(id: number, body: string[]): Observable<any> {
        return this.http.put(this.baseUrl + `kanban/${id}`, body);
    }

    // update(budget: IBudget): Observable<IBudget> {
    //     const body = {
    //         amount: budget.amount,
    //         description: budget.description,
    //         type: budget.type
    //     }
    //     return this.http.put<IBudget>(this.baseUrl + `calc/${budget.id}`, body);
    // }
}