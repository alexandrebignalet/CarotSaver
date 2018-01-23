import { BaseEntity } from './../../shared';
import {DishCs} from "../dish/dish-cs.model";

export class MenuCs implements BaseEntity {
    constructor(
        public id?: number,
        public dishes?: DishCs[],
    ) {
    }
}
