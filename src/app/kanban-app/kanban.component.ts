import { Observable } from 'rxjs';
import { timer } from 'rxjs';
import { KanbanService } from './kanban.service';
import { Component, OnInit } from "@angular/core";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { faPlus, faSearch, faHammer, faCheckDouble, faSave } from '@fortawesome/free-solid-svg-icons';
import { IKanban } from './kanban.i';


@Component({
    selector: "kanban",
    templateUrl: "kanban.component.html"
})

export class KanbanComponent implements OnInit {
  public faPlus = faPlus;
  public faSearch = faSearch;
  public faHammer = faHammer;
  public faCheckDouble = faCheckDouble;
  public faSave = faSave;

  public idea: string = '';
  public isVisible: boolean;
  public isEmpty: boolean;
  public ideas: string[] = [];
  public research: string[] = [];
  public todo: string[] = [];
  public done: string[] = [];


  private prevDataLength = {
    "ideas": 0,
    "research": 0,
    "todo": 0,
    "done": 0
  };

  constructor(private kanbanService: KanbanService) {}

  ngOnInit() {
    this.getData();
    // TODO include backend for proj
    // this.updateData();
  }

  getData() {
    this.kanbanService.getAll().subscribe((data: IKanban[]) => {
      if (data) {
    
        for (let i = 0; i < data.length; i++) {
            if (data[i].type == 'ideas') {
              this.ideas = data[i].list;
            }
            if (data[i].type == 'research') {
              this.research = data[i].list;
            }
            if (data[i].type == 'todo') {
              this.todo = data[i].list;
            }
            if (data[i].type == 'done') {
              this.done = data[i].list;
            }
        }

        this.prevDataLength = {
          ideas: this.ideas.length,
          research: this.research.length,
          todo: this.todo.length,
          done: this.done.length,
        }
      }
    })
  }
  
  updateData(): void {
    const time = timer(0, 5000)
    time.subscribe(() => {
      if (
        this.prevDataLength.ideas !== this.ideas.length ||
        this.prevDataLength.research !== this.research.length ||
        this.prevDataLength.todo !== this.todo.length ||
        this.prevDataLength.done !== this.done.length
      ) {
        
        this.kanbanService.update(0, this.ideas).subscribe(() => {
          this.getData();
        })
      }
      
    })
  }
  
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }

    if (!event.previousContainer.data || event.previousContainer.data.length == 0 || !this.ideas || this.ideas.length == 0) {
      this.isEmpty = true;
    }
  }

  showInput() {
    this.isVisible = !this.isVisible;
  }

  addIdea() {
    if (this.idea) {
      this.ideas.push(this.idea);
      this.idea = '';
      this.isVisible = false;
    }
  }

}