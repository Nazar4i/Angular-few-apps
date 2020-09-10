import { IBudget } from './budget.i';
import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class CalculatorService {
    private readonly baseUrl = 'http://localhost:3000/';

    constructor(public http: HttpClient){}

    getOne(id: string): Observable<IBudget> {
        return this.http.get<IBudget>(this.baseUrl + `calc/${id}`);
    }

    getAll(): Observable<IBudget[]> {
        return this.http.get<IBudget[]>(this.baseUrl + 'calc');
    }

    create(body: IBudget): Observable<IBudget> {
        return this.http.post<IBudget>(this.baseUrl + 'calc', body);
    }

    update(budget: IBudget): Observable<IBudget> {
        const body = {
            amount: budget.amount,
            description: budget.description,
            type: budget.type
        }
        return this.http.put<IBudget>(this.baseUrl + `calc/${budget.id}`, body);
    }

    delete(id: string): Observable<IBudget> {
        return this.http.delete<IBudget>(this.baseUrl + `calc/${id}`)
    }
}