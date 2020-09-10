import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { TicTacComponent } from './tic-tac.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
    { path: '', component: TicTacComponent },
]

@NgModule({
    imports: [
        FontAwesomeModule, 
        CommonModule, 
        FormsModule, 
        ReactiveFormsModule, 
        RouterModule.forChild(routes)
    ],
    declarations: [
        TicTacComponent
    ],
    providers: []
})

export class TicTacModule {}