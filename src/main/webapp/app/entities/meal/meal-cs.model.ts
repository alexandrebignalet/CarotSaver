import { BaseEntity } from './../../shared';
import {WasteMetricCs} from "../waste-metric";

export class MealCs implements BaseEntity {
    constructor(
        public id?: number,
        public nbPresent?: number,
        public menu?: BaseEntity,
        public wasteMetric?: WasteMetricCs,
        public createdDate?
    ) {
        if(wasteMetric) {
            this.wasteMetric = new WasteMetricCs(wasteMetric.id, wasteMetric.plastic, wasteMetric.green, wasteMetric.other);
        }
    }
}
