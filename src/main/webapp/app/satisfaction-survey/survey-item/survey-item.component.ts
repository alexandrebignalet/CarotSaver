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
        
    } 

    onSelectionChange(item): void {
        this.surveyItem.rate = item;
    }

    setFeedback(str): void {
        let img = str === 'up' ? "b20727af92cb5ce57b6d75978779f3c3" : "5fe6ce54cb08deee03cdf9aae815b166";
        let icon = document.getElementById(this.surveyItem.name);
        icon.setAttribute("style", "max-width:100%; height:auto;");
        icon.setAttribute("class", "img-thumbnail");
        icon.setAttribute("src", "content/" + img + ".jpg");
        this.surveyItem.liked =
            str === 'up' ? true : false;
    }
}
