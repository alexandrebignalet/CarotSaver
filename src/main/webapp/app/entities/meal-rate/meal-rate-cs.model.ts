import { BaseEntity } from './../../shared';

export class MealRateCs implements BaseEntity {
    constructor(
        public id?: number,
        public first?: number,
        public main?: number,
        public last?: number,
        public other?: number,
    ) {
    }
}
