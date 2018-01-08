import { BaseEntity } from './../../shared';

export class DishServeCs implements BaseEntity {
    constructor(
        public id?: number,
        public nbPresent?: number,
        public menu?: BaseEntity,
    ) {
    }
}
