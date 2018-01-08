import { BaseEntity } from './../../shared';

export class MealCs implements BaseEntity {
    constructor(
        public id?: number,
        public date?: any,
        public nbPresent?: number,
        public menu?: BaseEntity,
        public wasteMetric?: BaseEntity,
    ) {
    }
}
