import { Component, Input, OnChanges, OnInit } from '@angular/core';
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
    @Input() surveyItem: SurveyItem;
    
    constructor(){

    }

    ngOnInit(){
        console.log(this.surveyItem);
    } 

    onSelectionChange(item) : void {
        this.surveyItem.rate = item;
        console.log(this.surveyItem.rate);
    }
}
