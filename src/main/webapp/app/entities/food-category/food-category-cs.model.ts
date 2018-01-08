import { BaseEntity } from './../../shared';

export class FoodCategoryCs implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
    ) {
    }
}
