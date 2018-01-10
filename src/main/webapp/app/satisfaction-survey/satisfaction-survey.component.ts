import { Component, OnInit } from '@angular/core';
import { Survey } from './survey.model';

@Component({
    selector: 'satisfaction-survey',
    templateUrl: './satisfaction-survey.component.html',
    styleUrls: [
        
    ]

})
export class SatisfactionSurveyComponent implements OnInit{
    survey: Survey;

    constructor(){}
    ngOnInit(){
        this.survey = new Survey();
    }

    submit(){
        console.log(this.survey);
    }
}
