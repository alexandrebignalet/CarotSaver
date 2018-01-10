import { Component, OnInit } from '@angular/core';
import { Survey } from './survey.model';

@Component({
    selector: 'satisfaction-survey',
    templateUrl: './satisfaction-survey.component.html',
    styleUrls: [
        
    ]

})
export class SatisfactionSurveyComponent{
    survey: Survey = new Survey();

    constructor(){}

    submit(){
        console.log(this.survey);
    }
}