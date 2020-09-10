import { Component } from "@angular/core";
import { faVirus } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: "navigation",
    templateUrl: "nav.component.html"
})

export class NavComponent {
    faVirus = faVirus;
}