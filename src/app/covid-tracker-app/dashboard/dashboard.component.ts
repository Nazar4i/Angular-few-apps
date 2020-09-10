import { Component, Input } from "@angular/core";

@Component({
    selector: "app-dashboard",
    templateUrl: "dashboard.component.html"
})

export class DashboardComponent {
    @Input('totalConfirmed') totalConfirmed;
    @Input('totalDeaths') totalDeaths;
    @Input('totalActive') totalActive;
    @Input('totalRecovered') totalRecovered;

    constructor(){}
}