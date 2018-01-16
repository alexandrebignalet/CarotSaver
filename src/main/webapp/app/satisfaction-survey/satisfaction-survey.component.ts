import { Component, OnInit } from '@angular/core';
import { Survey } from './survey.model';
import { SatisfactionSurveyCsService } from '../entities/satisfaction-survey';
import { SatisfactionSurveyCs } from '../entities/satisfaction-survey';
import { MealRateCs, MealRateCsService } from '../entities/meal-rate';
import { ResponseWrapper } from '../shared/index';
import { BaseEntity } from '../shared'
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { SubscribableOrPromise } from 'rxjs/Observable';

@Component({
    selector: 'satisfaction-survey',
    templateUrl: './satisfaction-survey.component.html',
    styleUrls: [
        
    ]

})
export class SatisfactionSurveyComponent implements OnInit{
    survey: Survey;
    satisfactionSurvey: Array<any> = [];

    constructor(private surveyService: SatisfactionSurveyCsService, private mealRateService: MealRateCsService){

    }
    ngOnInit(){
        this.survey = new Survey();
    }

    submit(){
        console.log(this.survey);
        console.log(this.satisfactionSurvey);
        this.createSurvey();
    }

    private createSurvey(){
        let mealRates: Array<MealRateCs> = this.getMealRates(this.survey);
        let satisfactionSurvey: SatisfactionSurveyCs;
        
        let qtRateSub = this.mealRateService.create(mealRates[0]);
        let qlRateSub = this.mealRateService.create(mealRates[1]);

        let mealRateSub: Array<SubscribableOrPromise<MealRateCs>> = [qtRateSub, qlRateSub];
        Observable.forkJoin(mealRateSub).subscribe(
            (res) => {
                satisfactionSurvey = this.getSatisfactionSurvey(this.survey.studentName, res[0].id, res[1].id);
                this.surveyService.create(satisfactionSurvey).subscribe(
                    (res) => {
                        console.log(res)
                    },
                    (res: ResponseWrapper) => console.log(res.json)
                );
            }
        );
    }

    private getMealRates(_survey: Survey): Array<MealRateCs>{
        let mealRates: Array<MealRateCs> = [];
        mealRates.push(
            new MealRateCs(null, 
                _survey.menuArray[0].quantityRate,
                _survey.menuArray[1].quantityRate,
                _survey.menuArray[2].quantityRate,
                _survey.menuArray[3].quantityRate
            ),
            new MealRateCs(null, 
                _survey.menuArray[0].qualityRate,
                _survey.menuArray[1].qualityRate,
                _survey.menuArray[2].qualityRate,
                _survey.menuArray[3].qualityRate
            )
        );
        return mealRates;
    }

    private getSatisfactionSurvey(_studentName: string, _quantityRateId: number, _qualityRateId: number): SatisfactionSurveyCs{
        let quantityRate: BaseEntity = {};
        let qualityRate: BaseEntity = {};
        quantityRate.id = _quantityRateId;
        qualityRate.id = _qualityRateId;
        return new SatisfactionSurveyCs(null, _studentName, qualityRate, quantityRate);
    }
}
