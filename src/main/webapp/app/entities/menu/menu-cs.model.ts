import { BaseEntity } from './../../shared';

export class MenuCs implements BaseEntity {
    constructor(
        public id?: number,
        public date?: any,
        public wasteMetric?: BaseEntity,
        public meals?: BaseEntity[],
    ) {
    }
}
