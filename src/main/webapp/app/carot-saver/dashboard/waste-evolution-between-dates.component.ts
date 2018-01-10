import { Component, OnInit, Input } from '@angular/core';
import {MealCs} from "../../entities/meal/meal-cs.model";

@Component({
    selector: 'jhi-waste-evolution-between-dates',
    templateUrl: './waste-evolution-between-dates.component.html',
    styleUrls: [
        'dashboard.scss'
    ]
})
export class WasteEvolutionBetWeenDatesComponent implements OnInit {
    @Input() from;
    @Input() to;
    @Input() meals: MealCs[];

    constructor() {}

    ngOnInit() {
        console.log("bonjour ", this.from, this.to, this.meals);
    }
}
