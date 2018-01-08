import { BaseEntity } from './../../shared';

export const enum MealType {
    'ENTREE',
    'PRINCIPAL',
    'DESERT',
    'OTHER'
}

export class DishCs implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public type?: MealType,
        public foodCategories?: BaseEntity[],
    ) {
    }
}
