import { Component, OnInit } from '@angular/core';
import { SurveyItem } from './survey-item.model';
import { Survey } from '../survey.model';
import { NgModel } from '@angular/forms';

@Component({
    selector: 'survey-item',
    templateUrl: './survey-item.component.html',
    styleUrls: [
        
    ]

})
export class SurveyItemComponent implements OnInit{
    surveyItem: SurveyItem;
    constructor(){

    }

    ngOnInit() {
        this.surveyItem = new SurveyItem("Salade", 0);
    }

    onSelectionChange(item) : void {
        this.surveyItem.rate = item;
        console.log(this.surveyItem.rate);
    }
}