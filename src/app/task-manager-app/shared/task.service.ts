import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { IList } from './list.i';
import { ITask } from './task.i';
import { map } from 'rxjs/operators';

@Injectable()
export class TaskService {
    private readonly baseUrl = 'http://localhost:3000';
    public currentListId: number;

    constructor(private http: HttpClient) {}

    getLists(): Observable<IList[]> {
        return this.http.get<IList[]>(this.baseUrl + '/lists');
    }

    getTasks(): Observable<ITask[]> {
        return this.http.get<ITask[]>(this.baseUrl + '/tasks');
    }

    getTasksByListId(listId: number): Observable<ITask[]> {
        return this.http.get<ITask[]>(this.baseUrl + '/tasks').pipe(map((tasks: ITask[]) => {
            let res: ITask[] = [];
            if (tasks) {
                res = tasks.filter(task => task.listId == listId);
            }
            return res;
        }))
    }

    deleteList(listId: number): Observable<IList> {
        return this.http.delete<IList>(this.baseUrl + '/lists' + `/${listId}`);
    }
   

    addList(body: IList): Observable<IList> {
        return this.http.post<IList>(this.baseUrl + '/lists', body);
    }

    editList(listId: number, body: IList): Observable<IList> {
        return this.http.put<IList>(this.baseUrl + '/lists' + `/${listId}`, body);
    }

    addTask(body: ITask): Observable<ITask> {
        return this.http.post<ITask>(this.baseUrl + '/tasks', body);
    }

    deleteTask(taskId: number): Observable<ITask> {
        return this.http.delete<ITask>(this.baseUrl + '/tasks' + `/${taskId}`);
    }

    editTask(taskId: number, body: ITask): Observable<ITask> {
        return this.http.put<ITask>(this.baseUrl + '/tasks' + `/${taskId}`, body);
    }    

    getCurrentListId(): number{
        return this.currentListId;
    }

    setCurrentListId(listId: number) {
        this.currentListId = listId;
    }
}