import { SurveyItem } from "./survey-item/survey-item.model";

export class Survey{
    studentName: String;
    menuArray: Array<SurveyItem>;

    constructor(){
        this.studentName = "";
        this.menuArray = [
            new SurveyItem("Salade", 0),
            new SurveyItem("Pizza", 0),
            new SurveyItem("Frites", 0),
            new SurveyItem("Pain", 0)
        ];
    }
}
