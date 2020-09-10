import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = 
  [
    { path: '', component: LayoutComponent},
    { path: 'notes', loadChildren: () => import('./note-app/note.module').then(m => m.NoteModule) },
    { path: 'calculator', loadChildren: () => import('./calculator-app/calculator.module').then(m => m.CalculatorModule)},
    { path: 'kanban', loadChildren: () => import('./kanban-app/kanban.module').then(m => m.KanbanModule)},
    { path: 'tictac', loadChildren: () => import('./tic-tac-toe-app/tic-tac.module').then(m => m.TicTacModule)},
    { path: 'covid', loadChildren: () => import('./covid-tracker-app/covid.module').then(m => m.CovidModule)},
    { path: 'task', loadChildren: () => import('./task-manager-app/task.module').then(m => m.TaskModule)}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
