import { BaseEntity } from './../../shared';

export class MenuCs implements BaseEntity {
    constructor(
        public id?: number,
        public dishes?: BaseEntity[],
        public createdDate?: Date
    ) {
    }
}
