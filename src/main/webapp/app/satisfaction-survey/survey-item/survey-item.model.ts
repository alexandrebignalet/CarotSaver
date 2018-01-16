export class SurveyItem{
    name: string;
    quantityRate: number;
    qualityRate: number;

    constructor(_name: string, _qualityRate: number, _quantityRate: number){
        this.name = _name;
        this.qualityRate = _qualityRate;
        this.quantityRate = _quantityRate;
    }
}
