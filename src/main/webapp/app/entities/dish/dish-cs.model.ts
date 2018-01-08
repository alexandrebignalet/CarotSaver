import { BaseEntity } from './../../shared';

export const enum DishType {
    'ENTREE',
    'PRINCIPAL',
    'DESERT',
    'OTHER'
}

export class DishCs implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public type?: DishType,
        public foodCategories?: BaseEntity[],
    ) {
    }
}
