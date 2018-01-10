import { Component, OnInit, Input, OnChanges } from '@angular/core';
import {MealCs} from "../../entities/meal/meal-cs.model";

@Component({
    selector: 'jhi-line-chart-meals',
    templateUrl: './line-chart-meals.component.html',
    styleUrls: [
        'dashboard.scss'
    ]
})
export class LineChartMealsComponent implements OnInit, OnChanges {
    @Input() from;
    @Input() to;
    @Input('options') chartOpts;
    @Input() meals: MealCs[];

    public lineChartData:Array<any>;
    public lineChartLabels:Array<any>;

    constructor() {}

    ngOnInit() {
        this.lineChartData = [
            {data: [''], label: this.chartOpts.lineChartTitle}
        ];
        this.lineChartLabels = [''];

        console.log(this);
        if(!this.meals) {
            this.meals = [];
        }
    }

    ngOnChanges(changes) {
        if(changes.meals && changes.meals.currentValue) {
            this.meals = changes.meals.currentValue;
            this.updateCharts();
        }

        if(changes.to) {
            this.to = changes.to.currentValue;
        }

        if(changes.from) {
            this.from = changes.from.currentValue;
        }
    }

    private updateCharts() {

        this.lineChartLabels.length = 0;
        for(let i = 0; i < this.meals.length; i++) {
            this.lineChartLabels.push(this.meals[i].createdDate);
        }

        this.lineChartData = [
            {
                data: this.meals.map(this.chartOpts.mapper),
                label: this.chartOpts.lineChartTitle
            }
        ]
        ;
    }
}
