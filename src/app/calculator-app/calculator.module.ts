import { CalculatorComponent } from './calculator.component';
import { RouterModule, Routes } from '@angular/router';
import { CalculatorService } from './calculator.service';
import { NgModule } from "@angular/core";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


const routes: Routes = [
    { path: '', component: CalculatorComponent },
]

@NgModule({
    imports: [
        FontAwesomeModule, 
        CommonModule, 
        FormsModule, 
        ReactiveFormsModule, 
        RouterModule.forChild(routes)
    ],
    declarations: [CalculatorComponent],
    providers: [CalculatorService]
})

export class CalculatorModule {}