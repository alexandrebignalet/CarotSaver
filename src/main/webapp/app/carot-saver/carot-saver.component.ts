import { Component } from '@angular/core';
import {NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';

import {ResponseWrapper} from '../shared/model/response-wrapper.model';
import {JhiAlertService } from 'ng-jhipster';

import {MealCsService} from '../entities/meal/meal-cs.service';
import {MealCs} from '../entities/meal/meal-cs.model';

const equals = (one: NgbDateStruct, two: NgbDateStruct) =>
one && two && two.year === one.year && two.month === one.month && two.day === one.day;

const before = (one: NgbDateStruct, two: NgbDateStruct) =>
    !one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
        ? false : one.day < two.day : one.month < two.month : one.year < two.year;

const after = (one: NgbDateStruct, two: NgbDateStruct) =>
    !one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
        ? false : one.day > two.day : one.month > two.month : one.year > two.year;
@Component({
    selector: 'jhi-carot-saver',
    templateUrl: './carot-saver.component.html',
    styleUrls: [
        'carot-saver.scss'
    ]
})
export class CarotSaverComponent {
    hoveredDate: NgbDateStruct;

    fromDate: NgbDateStruct;
    toDate: NgbDateStruct;
    meals: MealCs[];

    constructor(
        private calendar: NgbCalendar,
        private mealService: MealCsService,
        private jhiAlertService: JhiAlertService,
    ) {
        this.fromDate = calendar.getToday();
        this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
    }

    ngOnInit() {
        this.loadByCreatedDateBetween();
    }

    loadByCreatedDateBetween() {
        if(!(this.fromDate && this.toDate)) return;

        this.mealService.findByCreatedDateBetWeen(this.formatDate(this.fromDate), this.formatDate(this.toDate)).subscribe(
            (res: ResponseWrapper) => {
                this.meals = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }

    private formatDate(date) {
        return `${date.year}-${date.month}-${date.day}`;
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

    onDateChange(date: NgbDateStruct) {
        if (!this.fromDate && !this.toDate) {
            this.fromDate = date;
        } else if (this.fromDate && !this.toDate && after(date, this.fromDate)) {
            this.toDate = date;
        } else {
            this.toDate = null;
            this.fromDate = date;
        }
        this.loadByCreatedDateBetween();
    }

    isHovered = date => this.fromDate && !this.toDate && this.hoveredDate && after(date, this.fromDate) && before(date, this.hoveredDate);
    isInside = date => after(date, this.fromDate) && before(date, this.toDate);
    isFrom = date => equals(date, this.fromDate);
    isTo = date => equals(date, this.toDate);

    public wasteEvolutionChartOpts = {
        mapper: (meal: MealCs) => {
            let myMeal = new MealCs(meal.id, meal.nbPresent, meal.menu, meal.wasteMetric);
            return myMeal.wasteMetric.getTotal();
        },
        lineChartTitle: 'Evolution du gaspillage',
        lineChartOptions: { responsive: true },
        lineChartColors: [
            { // grey
                backgroundColor: 'rgba(148,159,177,0.2)',
                borderColor: 'rgba(148,159,177,1)',
                pointBackgroundColor: 'rgba(148,159,177,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(148,159,177,0.8)'
            }
        ],
        lineChartLegend: true,
        lineChartType: 'line'
    };

    public studentEvolutionChartOpts  = {
        mapper: (meal: MealCs) => meal.nbPresent,
        lineChartTitle: 'Evolution de la fréquentation',
        lineChartOptions: { responsive: true },
        lineChartColors: [
            { // grey
                backgroundColor: 'rgba(198,159,177,0.2)',
                borderColor: 'rgba(198,159,177,1)',
                pointBackgroundColor: 'rgba(198,159,177,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(198,159,177,0.8)'
            }
        ],
        lineChartLegend: true,
        lineChartType: 'line'
    };
}
