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
        this.surveyItem.quantityRate = item;
    }

    setFeedback(item): void {
        let img = this.getImage(item);
        let icon = document.getElementById(this.surveyItem.name);
        icon.setAttribute("style", "max-width:100%; height:auto;");
        icon.setAttribute("class", "img-thumbnail");
        icon.setAttribute("src", "content/" + img + ".jpg");
        this.surveyItem.qualityRate = item;
    }

    private getImage(nb: number): string{
        if (nb === 0){
            return null;
        }
        else if (nb === 1){
            return '994a7128c3d898cd4d16098f55e79cf2';
        }
        else if (nb ===2){
            return '8b032682ff95077c905919d9548c6e11';
        }
        else{
            return 'b20727af92cb5ce57b6d75978779f3c3';
        }
    }
}
