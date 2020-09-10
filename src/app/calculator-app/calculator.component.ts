import { IBudget } from './budget.i';
import { CalculatorService } from './calculator.service';
import { Component, OnInit } from "@angular/core";
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: "calculator",
    templateUrl: "calculator.component.html"
})

export class CalculatorComponent implements OnInit {
    faTimes = faTimes;
   
    public total: number = 0;
    public isOpen: boolean;

    public calculator: IBudget = {amount: '', description: ''};
    public budget: IBudget[] = [];
    public incomes: IBudget[] = [];
    public expenses: IBudget[] = [];

    constructor(private calculatorService: CalculatorService) {}

    ngOnInit() {
        this.getBudget();
    }

    getBudget() {
        this.calculatorService.getAll().subscribe((res: IBudget[]) => {
            this.budget = res;
            this.culcArrs(this.budget);
        })
    }

    add(amount, description) {
        const result: IBudget = {
            amount, 
            description,
            type: (amount + '').startsWith('-') ? 'expenses' : 'income'
        };

        this.calculatorService.create(result).subscribe(() => {
            this.getBudget();
        });

        this.calculator = {amount: '', description: ''};
    }

    deleteItem(id: string,) {
        this.calculatorService.delete(id).subscribe(() => {
            this.getBudget();
        })
    }

    edit() {
        if (this.calculator) {
            this.calculatorService.update(this.calculator).subscribe(() => {
                this.closePopup();
                this.getBudget();
            })
        }
    }

    countPlus() {
        if (this.calculator.amount) {
            this.calculator.amount = +this.calculator.amount + 1 + ''
        } else {
            this.calculator.amount = 1 + ''
        }
    }

    countMinus() {
        if (this.calculator.amount) {
            this.calculator.amount = +this.calculator.amount - 1 + ''
        } else {
            this.calculator.amount = -1 + '';
        }
    }

    culcArrs(budget: IBudget[]) {
        let total = 0;

        if (budget && budget.length) {
            for (let i = 0; i < budget.length; i++) {
                total += +budget[i].amount;
            }
        }

        this.total = total;
    }

    openPopup(id: string) {
        this.calculator = {amount: '', description: ''};
        this.calculatorService.getOne(id).subscribe((res: IBudget) => {
            this.calculator = res;
            
        } )
        this.isOpen = true;
    }
    
    closePopup() {
        this.calculator = {amount: '', description: ''};
        this.isOpen = false;
    }
}