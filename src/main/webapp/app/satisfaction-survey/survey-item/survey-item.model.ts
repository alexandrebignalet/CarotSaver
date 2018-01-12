export class SurveyItem{
    name: string;
    rate: Number;
    liked: boolean = false;

    constructor(_name: string, _rate: Number){
        this.name = _name;
        this.rate = _rate;
    }
}
