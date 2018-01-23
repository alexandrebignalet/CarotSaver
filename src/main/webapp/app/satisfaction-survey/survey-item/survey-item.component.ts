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

    class1:any;
    class2:any;
    class3:any;

    constructor(){

    }

    ngOnInit(){

    }

    onSelectionChange(item): void {
        this.surveyItem.quantityRate = item;
    }

    setFeedback(item): void {
        let img = this.getImage(item);

        this.setActive(item);

        /*let icon = document.getElementById(this.surveyItem.name);
        icon.setAttribute("style", "max-width:100%; height:auto;");
        icon.setAttribute("class", "img-thumbnail");
        icon.setAttribute("src", "content/" + img + ".jpg");
        */console.log(item);
        this.surveyItem.qualityRate = item;
    }

    setActive(item) {
        if( item == 1) {
            this.class1 = "border-success";
            this.class2 = "border-light";
            this.class3 = "border-light";
        }
        if( item == 2) {
            this.class1 = "border-light";
            this.class2 = "border-success";
            this.class3 = "border-light";
        }
        if( item == 3) {
            this.class1 = "border-light";
            this.class2 = "border-light";
            this.class3 = "border-success";
        }
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
